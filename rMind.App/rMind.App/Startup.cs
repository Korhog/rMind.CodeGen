
namespace rMind.App;
public class Startup
{
    public void Configure(IApplicationBuilder app)
    {
        app.UseStatusCodePages();   

    }

    public void ConfigureServices(IServiceCollection services)
    {

    }
}
