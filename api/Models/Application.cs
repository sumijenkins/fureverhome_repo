using System.Text.Json.Serialization;
using api.Models;

public enum ApplicationStatus
{
    Pending,
    Approved,
    Rejected
}
namespace api.Models
{
    public class Application
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PetId { get; set; }
        public ApplicationStatus Status { get; set; } = ApplicationStatus.Pending;
        public DateTime ApplicationDate { get; set; } = DateTime.UtcNow;
        public string? Message { get; set; }

        public string? PetName { get; set; }

        // Navigation properties
        [JsonIgnore]
        public Pet? Pet { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
    }

}
