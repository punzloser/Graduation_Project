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
        //[Required(ErrorMessage = "Nhập thể loại")]
        [GenreAttribute]
        public string Name { get; set; }
    }
}
