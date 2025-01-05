using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.Data;

namespace api.Controllers{

    [ApiController]
    [Route("api/[Controller]")]
    public class UsersController : ControllerBase{

        private readonly UserDbContext _context;
        public UsersController (UserDbContext context){
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        
        
        [HttpGet("{id}")]
        public async Task<ActionResult> GetById([FromRoute] int id ){
            var users = await _context.Users.FindAsync(id);
            if (users == null) return NotFound();
            return Ok(users);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser([FromRoute] int id, [FromBody] User user)
        {
            if (id != user.Id)
            {
                return BadRequest("User ID mismatch.");
            }

            _context.Entry(user).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();  // 204 No Content response
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();  // 204 No Content response after successful deletion
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] User user ){
            // Check if the user already exists by email
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return BadRequest("A user with this email already exists.");
            }

            // Add the new user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return the created user with a 201 Created status
            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Email and password are required.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);
            if (user == null)
            {
                return BadRequest("Invalid email or password.");
            }

            // Şifre kontrolü (örnek olarak düz metin kullanılmış, hashing kullanılmalı)
            if (user.Password != loginRequest.Password)
            {
                return BadRequest("Invalid email or password.");
            }

            return Ok(new { Message = "Login successful", User = user });
        }

    }
}