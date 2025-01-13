using Microsoft.Extensions.Logging;  // Add this namespace for logging
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;

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
                .ToListAsync();

            if (applications == null || !applications.Any())
            {
                return NotFound(new { message = "No applications found for this user." });
            }

            return Ok(applications);  // This should return a valid JSON array
        }

        [HttpGet("received-applications/{userId}")]
        public async Task<ActionResult<IEnumerable<Application>>> GetReceivedApplications(int userId)
        {
            var applications = await _context.Applications
                .Where(a => a.Pet.OwnerId == userId)  // Filter applications for pets owned by the user
                .Include(a => a.User)  // Include user data to show who applied
                .Include(a => a.Pet)   // Include pet data
                .ToListAsync();

            if (applications == null || !applications.Any())
            {
                return NotFound(new { message = "No applications received for your pets." });
            }

            return Ok(applications);  // Return a valid JSON array of received applications
        }

    }
}
