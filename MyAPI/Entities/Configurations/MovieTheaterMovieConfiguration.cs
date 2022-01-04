using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Entities.Configurations
{
    public class MovieTheaterMovieConfiguration : IEntityTypeConfiguration<MovieTheaterMovie>
    {
        public void Configure(EntityTypeBuilder<MovieTheaterMovie> builder)
        {
            builder.HasKey(a => new { a.MovieId, a.MovieTheaterId });

            builder
                .HasOne(a => a.Movie)
                .WithMany(a => a.MovieTheaterMovies)
                .HasForeignKey(a => a.MovieId);

            builder
                .HasOne(a => a.MovieTheater)
                .WithMany(a => a.MovieTheaterMovies)
                .HasForeignKey(a => a.MovieTheaterId);
        }
    }
}
