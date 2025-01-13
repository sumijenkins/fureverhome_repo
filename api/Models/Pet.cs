using System.Text.Json.Serialization;
using api.Models;

namespace api.Models
{
    public class Pet
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Breed { get; set; }
        public int Age { get; set; }
        public string? Sex { get; set; }
        public string? Description { get; set; }
        public bool IsAdopted { get; set; }
        public int? OwnerId { get; set; }  // Sahip ID'si
        public string? PictureUrl { get; set; }

        [JsonIgnore]
        public User? Owner { get; set; }
        public List<Application>? Applications { get; set; }  // Pet'e yapılan başvurular
    }


}

