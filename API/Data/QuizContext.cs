using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class QuizContext : IdentityDbContext
    {
        public QuizContext(DbContextOptions options) : base(options)
        {
        }
    }
}