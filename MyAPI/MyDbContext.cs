using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyAPI.Entities;
using MyAPI.Entities.Configurations;
using System;
using System.Diagnostics.CodeAnalysis;

namespace MyAPI
{
    public class MyDbContext : IdentityDbContext
    {
        public MyDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new MovieActorConfiguration());

            modelBuilder.ApplyConfiguration(new MovieTheaterMovieConfiguration());

            modelBuilder.ApplyConfiguration(new MovieGenreConfiguration());

            modelBuilder.Entity<IdentityUserLogin<string>>().HasKey(a => a.UserId);
            modelBuilder.Entity<IdentityUserRole<string>>().HasKey(a => new { a.UserId, a.RoleId });
            modelBuilder.Entity<IdentityUserToken<string>>().HasKey(a => a.UserId);
        }

        public DbSet<Genre> Genres { get; set; }

        public DbSet<Actor> Actors { get; set; }

        public DbSet<MovieTheater> MovieTheaters { get; set; }

        public DbSet<Movie> Movies { get; set; }

        public DbSet<MovieActor> MovieActors { get; set; }

        public DbSet<MovieGenre> MovieGenres { get; set; }

        public DbSet<MovieTheaterMovie> MovieTheaterMovies { get; set; }
    }
}
