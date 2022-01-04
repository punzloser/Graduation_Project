using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Entities
{
    public class MovieTheater
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Tối đa 50 kí tự")]
        public string Name { get; set; }

        public Point Location { get; set; }

        public List<MovieTheaterMovie> MovieTheaterMovies { get; set; }
    }
}
