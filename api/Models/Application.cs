using System.ComponentModel.DataAnnotations;

namespace api.Models{
    public class Application{
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int PetId { get; set; }

        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "Pending";

        [Required]
        public DateTime ApplicationDate { get; set; } = DateTime.UtcNow;

        public User User { get; set; }
        public Pet Pet { get; set; }
    }
}