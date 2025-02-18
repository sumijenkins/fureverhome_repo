using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.Data;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace api.Controllers{

    [ApiController]
    [Route("api/[Controller]")]
    public class UsersController : ControllerBase{

        private readonly ApplicationDbContext _context;
        public UsersController (ApplicationDbContext context){
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> GetById([FromRoute] int id)
        {
            try
            {
                var users = await _context.Users
                    .Include(u => u.Applications)
                    .Include(u => u.Pets)
                    .FirstOrDefaultAsync(u => u.Id == id);

                if (users == null)
                    return NotFound(new { error = "User not found" });

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while fetching the user.", details = ex.Message });
            }
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

        [HttpGet("check-auth")]
        public IActionResult CheckAuth()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            // Token geçerli mi kontrol et
            if (string.IsNullOrEmpty(token) || !ValidateToken(token))
            {
                return Ok(new { isAuthenticated = false });
            }

            return Ok(new { isAuthenticated = true });
        }

        // Token doğrulama fonksiyonu
        private bool ValidateToken(string token)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(token) as JwtSecurityToken;
                if (jsonToken == null)
                    return false;

                var expirationDate = jsonToken.ValidTo;
                if (expirationDate < DateTime.UtcNow)
                {
                    return false; // Token süresi geçmiş
                }

                return true; // Token geçerli
            }
            catch (Exception)
            {
                return false; // Hata durumunda geçersiz kabul et
            }
        }

        [HttpPost("{userId}/add-pet")]
        public async Task<IActionResult> AddPet(int userId, [FromBody] Pet pet)
        {
            // Kullanıcıyı doğrula
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            // Pet ekle ve kullanıcıya bağla
            pet.OwnerId = userId;
            _context.Pets.Add(pet);

            // Kullanıcının pet listesini güncelle
            if (user.Pets == null)
            {
                user.Pets = new List<Pet>();
            }
           
            user.Pets.Add(pet);
            _context.Attach(user); // Attach the user object
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
        }

        [HttpGet("me")]
        [Authorize] // Ensure the user is authenticated
        public async Task<ActionResult<User>> GetMyProfile()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "Invalid user token" });
            }

            var user = await _context.Users
                .Include(u => u.Pets) // Include related pets if needed
                .FirstOrDefaultAsync(u => u.Id == int.Parse(userId));

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(new
            {
                user.Name,
                user.Email,
                Pets = user.Pets?.Select(p => new { p.Id, p.Name }).ToList() // Optionally include pets
            });
        }




    }
}