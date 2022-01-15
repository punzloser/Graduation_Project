using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyAPI.Entities;
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
            modelBuilder.Entity<MovieActor>().HasKey(a => new { a.ActorId, a.MovieId });

            modelBuilder.Entity<MovieTheaterMovie>().HasKey(a => new { a.MovieTheaterId, a.MovieId });

            modelBuilder.Entity<MovieGenre>().HasKey(a => new { a.MovieId, a.GenreId });

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Genre> Genres { get; set; }

        public DbSet<Actor> Actors { get; set; }

        public DbSet<MovieTheater> MovieTheaters { get; set; }

        public DbSet<Movie> Movies { get; set; }

        public DbSet<MovieActor> MovieActors { get; set; }

        public DbSet<MovieGenre> MovieGenres { get; set; }

        public DbSet<MovieTheaterMovie> MovieTheaterMovies { get; set; }

        public DbSet<Rating> Ratings { get; set; }
    }
}
