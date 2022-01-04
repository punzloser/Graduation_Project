using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Entities
{
    public class Movie
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Nhập tựa phim")]
        [StringLength(50, ErrorMessage = "Tối đa 50 kí tự")]
        public string Title { get; set; }

        public string Trailer { get; set; }

        public string Summary { get; set; }

        public DateTime ReleaseDate { get; set; }

        public bool InTheaters { get; set; }

        public string Poster { get; set; }

        public List<MovieActor> MovieActors { get; set; }
        public List<MovieTheaterMovie> MovieTheaterMovies { get; set; }
        public List<MovieGenre> MovieGenres { get; set; }
    }
}
