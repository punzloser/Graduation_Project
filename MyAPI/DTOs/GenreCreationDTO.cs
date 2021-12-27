using MyAPI.Validations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.DTOs
{
    public class GenreCreationDTO
    {
        [StringLength(maximumLength: 30, ErrorMessage = "Tối đa 30 kí tự")]
        [GenreAttribute]
        public string Name { get; set; }
    }
}
