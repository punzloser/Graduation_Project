using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Entities
{
    public class MovieTheaterMovie
    {
        public int MovieId { get; set; }

        public int MovieTheaterId { get; set; }

        public Movie Movie { get; set; }

        public MovieTheater MovieTheater { get; set; }
    }
}
