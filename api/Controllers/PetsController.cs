
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PetsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PetsController(ApplicationDbContext context)
    {
        _context = context;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pet>>> GetPets()
    {
        var pets = await _context.Pets
        .Include(p => p.Owner)  // Ensure the Owner is included in the query
        .ToListAsync();

        var petDtos = pets.Select(pet => new
        {
            pet.Id,
            pet.Name,
            pet.Breed,
            pet.Age,
            pet.Sex,
            pet.Description,
            pet.IsAdopted,
            pet.OwnerId,
            OwnerName = pet.Owner != null ? pet.Owner.Name : "Unknown" ,// Include the owner's name
            pet.PictureUrl
        }).ToList();
        
        return Ok(petDtos);
    }

    


    [HttpGet("{id}")]
    public async Task<ActionResult<Pet>> GetPet(int id)
    {
        var pet = await _context.Pets.FindAsync(id);
        if (pet == null)
        {
            return NotFound();
        }
        return pet;
    }

    [HttpPost]
    public async Task<ActionResult<Pet>> CreatePet([FromForm] Pet pet, IFormFile picture)
    {
        if (picture != null)
        {
            try
            {
                // Define the folder path to save the image
                var imagesFolder = Path.Combine(Directory.GetCurrentDirectory(), "project", "public", "images");

                // Check if the folder exists, and create it if not
                if (!Directory.Exists(imagesFolder))
                {
                    Console.WriteLine("Images folder does not exist. Creating folder...");
                    Directory.CreateDirectory(imagesFolder);
                }

                // Generate a unique file name using a GUID and preserve the file extension
                var fileExtension = Path.GetExtension(picture.FileName); // Get the file extension (e.g., .jpg)
                var uniqueFileName = Guid.NewGuid().ToString() + fileExtension; // Generate a unique name

                // Define the full file path
                var filePath = Path.Combine(imagesFolder, uniqueFileName);
                Console.WriteLine($"Saving file to: {filePath}");

                // Save the image to the folder
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await picture.CopyToAsync(stream);
                    Console.WriteLine("Image saved successfully.");
                }

                // Store the relative URL in the database (e.g., "/images/unique-file-name.jpg")
                pet.PictureUrl = "/images/" + uniqueFileName;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine("Error saving image: " + ex.Message);
                return BadRequest("Error occurred while saving the image.");
            }
        }

        _context.Pets.Add(pet);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPet), new { id = pet.Id }, pet);
    }




    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePet(int id, Pet pet)
    {
        if (id != pet.Id)
        {
            return BadRequest();
        }

        _context.Entry(pet).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePet(int id)
    {
        var pet = await _context.Pets.FindAsync(id);
        if (pet == null)
        {
            return NotFound();
        }

        _context.Pets.Remove(pet);
        await _context.SaveChangesAsync();
        return NoContent();
    }

   




}
