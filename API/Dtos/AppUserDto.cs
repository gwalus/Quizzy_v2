using System;

namespace API.Dtos
{
    public class AppUserDto
    {
        public string Username { get; set; }
        public DateTime Created { get; set; }
        public string FavouriteCategory { get; set; }
        public string Token { get; set; }
    }
}
