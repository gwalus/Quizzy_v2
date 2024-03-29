using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<QuizContext>();

                await context.Database.MigrateAsync();

                var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
                var userManager = services.GetRequiredService<UserManager<AppUser>>();

                var roles = new List<AppRole>{
                    new AppRole{Name="Admin"},
                    new AppRole{Name="Moderator"},
                    new AppRole{Name="User"}
                };

                foreach (var role in roles)
                {
                    if (await roleManager.RoleExistsAsync(role.Name))
                        continue;

                    await roleManager.CreateAsync(role);
                }

                var admin = new AppUser
                {
                    UserName = "admin"
                };

                var defaultUser = new AppUser
                {
                    UserName = "user"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });

                await userManager.CreateAsync(defaultUser, "Pa$$w0rd");
                await userManager.AddToRolesAsync(defaultUser, new[] { "User" });

                await host.RunAsync();
            }
            catch (Exception)
            {
            }

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
