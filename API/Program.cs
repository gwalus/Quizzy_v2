using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
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
                var roleManager = services.GetRequiredService<RoleManager<AppRole>>();

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

                await host.RunAsync();
            }
            catch (Exception ex)
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
