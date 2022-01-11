using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MyAPI.APIBehavior;
using MyAPI.Constants;
using MyAPI.Filters;
using MyAPI.Helpers;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using System;
using System.Text;

namespace MyAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers(opt =>
            {
                opt.Filters.Add(typeof(ParseBadRequest));
            }).ConfigureApiBehaviorOptions(BadRequestBehavior.Parse);

            services.AddDbContext<MyDbContext>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("Default"),
                    sqlOpt => sqlOpt.UseNetTopologySuite());
            });

            services.AddCors(opt =>
            {
                var reactUrl = Configuration.GetValue<string>("ReactUrl");
                opt.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(reactUrl).AllowAnyMethod().AllowAnyHeader()
                    .WithExposedHeaders("totalOfRecords");
                });
            });

            services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);

            services.AddSingleton(provider => new MapperConfiguration(config =>
             {
                 var geometryFactory = provider.GetRequiredService<GeometryFactory>();
                 config.AddProfile(new AutoMapperProfile(geometryFactory));
             }).CreateMapper());

            services.AddSingleton<GeometryFactory>(NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326));

            services.AddScoped<IFileStorageService, AzureStorageService>();

            services.AddHttpContextAccessor();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAPI", Version = "v1" });
            });

            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<MyDbContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey =
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration[SystemConstants.Key])),
                        ClockSkew = TimeSpan.Zero
                    };
                });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
