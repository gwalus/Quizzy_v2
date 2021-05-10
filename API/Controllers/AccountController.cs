using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AuthController : ControllerBase
    {
        UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public AuthController(UserManager<AppUser> userManager, IMapper mapper, ITokenService tokenService)
        {
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpPost("register")]

        public async Task<ActionResult<AppUserDto>> DefaultRegister(UserDefaultRegisterDto userRegisterDto)
        {
            if (await UserExists(userRegisterDto.Username))
                return BadRequest("Username is taken");

            var user = _mapper.Map<AppUser>(userRegisterDto);

            user.UserName = userRegisterDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, userRegisterDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "User");

            if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

            return new AppUserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUserDto>> DefaultRegister(UserDefaultLoginDto userDefaultLoginDto)
        {
            if (!(await UserExists(userDefaultLoginDto.Email.ToLower())))
                return NotFound();

            var user = await _userManager.FindByEmailAsync(userDefaultLoginDto.Email);

            if (await _userManager.CheckPasswordAsync(user, userDefaultLoginDto.Password))
            {
                return new AppUserDto
                {
                    Username = user.UserName,
                    Token = await _tokenService.CreateToken(user)
                };
            }

            return BadRequest("Email or password invalid");
        }

        private async Task<bool> UserExists(string userName)
        {
            return await _userManager.Users.AnyAsync(u => u.UserName == userName.ToLower());
        }
    }
}
