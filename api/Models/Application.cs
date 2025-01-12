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

        // Navigation properties
        public Pet? Pet { get; set; }
        public User? User { get; set; }
    }

}
