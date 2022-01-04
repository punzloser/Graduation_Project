using Microsoft.EntityFrameworkCore;
using MyAPI.Entities;
using MyAPI.Entities.Configurations;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI
{
    public class MyDbContext : DbContext
    {
        public MyDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new MovieActorConfiguration());

            modelBuilder.ApplyConfiguration(new MovieTheaterMovieConfiguration());

            modelBuilder.ApplyConfiguration(new MovieGenreConfiguration());
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
