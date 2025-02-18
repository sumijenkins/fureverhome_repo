using Microsoft.Extensions.Logging;  // Add this namespace for logging
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using System.Linq;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ApplicationsController> _logger;  // Add logger

        public ApplicationsController(ApplicationDbContext context, ILogger<ApplicationsController> logger)  // Inject logger into the constructor
        {
            _context = context;
            _logger = logger;  // Assign the logger
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateApplicationStatus(int id, [FromBody] ApplicationUpdateRequest request)
        {
            _logger.LogInformation("Received request to update application with id: {id}", id);

            // Find the application by ID
            var application = await _context.Applications
                .Include(a => a.Pet)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (application == null)
            {
                _logger.LogWarning("Application with id {id} not found.", id);
                return NotFound(new { message = "Application not found." });
            }

            // Check if the pet is already adopted
            if (request.Status == ApplicationStatus.Approved && application.Pet.IsAdopted)
            {
                _logger.LogWarning("Pet with id {petId} is already adopted.", application.PetId);
                return BadRequest(new { message = "This pet is already adopted." });
            }

            // Update the status
            application.Status = request.Status;

            // Mark the pet as adopted if approved
            if (request.Status == ApplicationStatus.Approved)
            {
                application.Pet.IsAdopted = true;
            }

            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation("Application with id {id} updated successfully.", id);
                return Ok(new { message = "Application status updated successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating application with id {id}.", id);
                return StatusCode(500, new { message = "An error occurred while updating the application." });
            }
        }

        // POST: api/Applications/apply/{petId}
        [HttpPost("apply/{petId}")]
        public async Task<ActionResult<Application>> ApplyForAdoption(int petId, Application application)
        {
            _logger.LogInformation("Received request to apply for adoption for petId: {petId}", petId);  // Log the request

            var pet = await _context.Pets.FindAsync(petId);
            if (pet == null || pet.IsAdopted)
            {
                _logger.LogWarning("Pet with id {petId} is either not available or already adopted.", petId);  // Log the warning
                return BadRequest(new { message = "Pet is either not available or already adopted." });
            }

            var user = await _context.Users.FindAsync(application.UserId);
            if (user == null)
            {
                _logger.LogWarning("User with id {userId} not found.", application.UserId);  // Log the warning
                return BadRequest(new { message = "User not found." });
            }

            var existingApplication = await _context.Applications
                .FirstOrDefaultAsync(a => a.PetId == petId && a.UserId == application.UserId);
            if (existingApplication != null)
            {
                _logger.LogWarning("User with id {userId} has already applied for pet with id {petId}.", application.UserId, petId);  // Log the warning
                return BadRequest(new { message = "You have already applied for this pet." });
            }

            application.PetId = petId;
            application.Status = ApplicationStatus.Pending;
            application.ApplicationDate = DateTime.UtcNow;

            _context.Applications.Add(application);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Application created successfully for user {userId} and pet {petId}.", application.UserId, petId);  // Log success

            return CreatedAtAction(nameof(GetPetApplications), new { id = application.Id }, application);
        }

        // GET: api/Applications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Application>>> GetPetApplications([FromQuery] int? petId, [FromQuery] int? userId)
        {
            var query = _context.Applications
                .Include(pa => pa.User)
                .Include(pa => pa.Pet)
                .AsQueryable();

            if (petId.HasValue)
            {
                query = query.Where(pa => pa.PetId == petId.Value);
            }

            if (userId.HasValue)
            {
                query = query.Where(pa => pa.UserId == userId.Value);
            }

            return Ok(await query.ToListAsync());
        }

        // In your ApplicationsController
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Application>>> GetApplicationsByUser(int userId)
        {
            var applications = await _context.Applications
                .Where(a => a.UserId == userId)
                .Include(a => a.Pet)
                .ThenInclude(p => p.Owner)
                .ToListAsync();

            if (applications == null || !applications.Any())
            {
                return NotFound(new { message = "No applications found for this user." });
            }

            return Ok(applications.Select(a => new
            {
                a.Id,
                a.UserId,
                a.PetId,
                a.Status,
                a.ApplicationDate,
                a.Message,
                Pet = new
                {
                    a.Pet?.Name,
                    a.Pet?.Breed,
                    a.Pet?.Age,
                    a.Pet?.PictureUrl,
                    a.Pet?.OwnerId,
                    Owner = new  // Include the Owner's details here
                    {
                        a.Pet?.OwnerId,
                        OwnerName = a.Pet?.Owner != null ? a.Pet.Owner.Name : "Unknown Owner"
                    }
                }
            }));

        }


        [HttpGet("received/{userId}")]
        public async Task<ActionResult<IEnumerable<Application>>> GetReceivedApplications(int userId)
        {
            var applications = await _context.Applications
                .Where(a => a.Pet.OwnerId == userId)
                .Include(a => a.User)
                .Include(a => a.Pet)
                .ThenInclude(p => p.Owner)
                .ToListAsync();

            if (applications == null || !applications.Any())
            {
                return NotFound(new { message = "No applications received for your pets." });
            }

            return Ok(applications.Select(a => new
            {
                a.Id,
                a.UserId,
                a.PetId,
                a.Status,
                a.ApplicationDate,
                a.Message,
                Pet = a.Pet == null ? null : new // Anonymous object for Pet
                {
                    a.Pet.Name,
                    a.Pet.Breed,
                    a.Pet.Age,
                    a.Pet.PictureUrl,
                    Owner = a.Pet.Owner == null ? null : new // Anonymous object for Owner
                    {
                        a.Pet.Owner.Name,
                        a.Pet.Owner.Id // Include Owner Id
                    }
                },
                Applicant = a.User == null ? null : new // Anonymous object for Applicant
                {
                    a.User.Name,
                    a.User.Id // Include Applicant Id
                }
            }));
        }

        public class ApplicationUpdateRequest
        {
            public ApplicationStatus Status { get; set; }
        }
    }
}
