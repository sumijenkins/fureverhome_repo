
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
    public async Task<ActionResult<Pet>> CreatePet([FromForm]Pet pet, IFormFile picture)
    {

        if (picture != null)
        {
            // Define the folder path to save the image
            var imagesFolder = Path.Combine(Directory.GetCurrentDirectory(), "project", "public", "images");
            var filePath = Path.Combine(imagesFolder, picture.FileName);

            // Save the image to the folder
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await picture.CopyToAsync(stream);
            }

            // Store the relative URL in the database (e.g., "/images/pet123.jpg")
            pet.PictureUrl = "/images/" + picture.FileName;
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
