using System.Text.Json.Serialization;

namespace api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set;}
        public string? Surname { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }

        
        public List<Application>? Applications { get; set; }
        
        
        public List<Pet>? Pets { get; set; } = new List<Pet>();

    }
}