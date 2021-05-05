using Microsoft.AspNetCore.Identity;
using System;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public DateTime Created { get; set; } = DateTime.Now;
        public string FavouriteCategory { get; set; }
    }
}
