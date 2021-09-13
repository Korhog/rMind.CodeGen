using rMind.App;
using rMind.Core;

var builder = WebApplication.CreateBuilder (args);
builder.Services.AddRazorPages()
    .AddRazorRuntimeCompilation();
builder.Services.AddControllers();
builder.Services.AddSingleton<IEngine, Engine>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseDefaultFiles();

app.UseRouting();

app.MapRazorPages();
app.MapControllers();

app.Run();