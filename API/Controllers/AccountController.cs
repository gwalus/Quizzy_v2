using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api")]
    public class AccountController : ControllerBase
    {
        UserManager<AppUser> _userManager;

        public AccountController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult> GetString()
        {
            var user = new AppUser
            {
                UserName = "user"
            };

            var result = await _userManager.CreateAsync(user);

            if (result.Succeeded)
            {
                return Ok("Added");
            }

            return Ok("Fail");
        }
    }
}
