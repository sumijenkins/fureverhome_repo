
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
        return await _context.Pets.Where(p => p != null).ToListAsync();
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
    public async Task<ActionResult<Pet>> CreatePet(Pet pet)
    {
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
