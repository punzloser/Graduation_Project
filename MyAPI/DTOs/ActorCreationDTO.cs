using MyAPI.Validations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.DTOs
{
    public class ActorCreationDTO
    {

        [StringLength(maximumLength: 50, ErrorMessage = "Tối đa 50 kí tự")]
        [GeneralAttribute]
        public string Name { get; set; }

        public DateTime Dob { get; set; }

        public string Biography { get; set; }

        //public string Picture { get; set; }
    }
}
