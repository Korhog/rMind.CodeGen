using rMind.App;

var builder = WebApplication.CreateBuilder (args);
builder.Services.AddRazorPages();
builder.Services.AddControllers();



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