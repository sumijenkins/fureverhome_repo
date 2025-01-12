using api.Models;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Pet> Pets { get; set; }
    public DbSet<Application> Applications { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Pet - User ilişkisi (1 pet'in 1 sahibi olabilir, sahip olmadan da pet olabilir)
        modelBuilder.Entity<Pet>()
            .HasOne(p => p.Owner)
            .WithMany(u => u.Pets)
            .HasForeignKey(p => p.OwnerId)
            .OnDelete(DeleteBehavior.SetNull);

        // Application - User ilişkisi (1 user birden fazla başvuru yapabilir)
        modelBuilder.Entity<Application>()
            .HasOne(a => a.User)
            .WithMany(u => u.Applications)
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Application - Pet ilişkisi (1 pet'e birden fazla başvuru yapılabilir)
        modelBuilder.Entity<Application>()
            .HasOne(a => a.Pet)
            .WithMany(p => p.Applications)
            .HasForeignKey(a => a.PetId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
