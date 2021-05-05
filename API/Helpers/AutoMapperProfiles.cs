using API.Dtos;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserDefaultRegisterDto, AppUser>();
                //.ForMember(s => s.UserName.ToLower(), d=>d.MapFrom(a => a.Username));
            CreateMap<AppUser, AppUserDto>();
        }
    }
}
