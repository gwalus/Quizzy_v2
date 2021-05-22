using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class QuizContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>,
     AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public QuizContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<CustomCategory> CustomCategories { get; set; }
        public DbSet<CustomQuestion> CustomQuestions { get; set; }
        public DbSet<CustomIncorrectAnswer> CustomIncorrectAnswers { get; set; }
    }
}