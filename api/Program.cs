using api.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var services = builder.Services;
services.AddDbContext<PetDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DbConnection"),
        new MySqlServerVersion(new Version(8, 0, 21))));

services.AddDbContext<UserDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DbConnection"),
        new MySqlServerVersion(new Version(8, 0, 21))));

services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder.WithOrigins("http://localhost:3000")
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddMySqlDataSource(builder.Configuration.GetConnectionString("DbConnection")!);


services.AddControllers();
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
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "api v1");
    });
}

//services.AddControllers(
//options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);


app.UseCors("AllowLocalhost");
app.UseCors("AllowReactApp");
app.UseRouting();
app.MapControllers();

app.Run();
