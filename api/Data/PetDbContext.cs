using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class PetDbContext(DbContextOptions<PetDbContext> options) : DbContext(options)
    {
        public DbSet<Pet> Pets { get; set; }
    }
}