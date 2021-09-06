
using Microsoft.AspNetCore.Server.Kestrel.Core;

namespace rMind.App;
public class Startup
{
    private IConfiguration _configuration; 

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }  

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.Configure<KestrelServerOptions>(_configuration.GetSection("Kestrel"));
        services.AddControllers();
    }
}
