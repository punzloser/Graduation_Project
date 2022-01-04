using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Entities.Configurations
{
    public class MovieGenreConfiguration : IEntityTypeConfiguration<MovieGenre>
    {
        public void Configure(EntityTypeBuilder<MovieGenre> builder)
        {
            builder.HasKey(a => new { a.MovieId, a.GenreId });

            builder
                .HasOne(a => a.Movie)
                .WithMany(a => a.MovieGenres)
                .HasForeignKey(a => a.MovieId);

            builder
                .HasOne(a => a.Genre)
                .WithMany(a => a.MovieGenres)
                .HasForeignKey(a => a.GenreId);
        }
    }
}
