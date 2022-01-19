using MyAPI.Validations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Entities
{
    public class Genre
    {
        public int Id { get; set; }

        [StringLength(maximumLength: 30, ErrorMessage = "Tối đa 30 kí tự")]
        [GeneralAttribute]
        public string Name { get; set; }

        public List<MovieGenre> MovieGenres { get; set; }
    }
}
