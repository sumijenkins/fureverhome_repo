using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var services = builder.Services;

// Configure the DbContext to use MySQL
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DbConnection"),
        new MySqlServerVersion(new Version(8, 0, 21))));

// Configure CORS
services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder.WithOrigins("http://localhost:3000")
                          .AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});
services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });


//services.AddControllers();
services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
    });
}

app.UseStaticFiles(); //use photos
app.UseCors("AllowLocalhost");  // Make sure this matches the policy name
app.UseRouting();
app.MapControllers();

app.Run();
