using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Entities
{
    public class MovieGenre
    {
        public int MovieId { get; set; }

        public int GenreId { get; set; }

        public Movie Movie { get; set; }

        public Genre Genre { get; set; }
    }
}
