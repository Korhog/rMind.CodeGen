using rMind.App;

var builder = WebApplication.CreateBuilder (args);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.MapRazorPages();
app.UseStatusCodePages();
app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();