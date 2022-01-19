using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Entities
{
    public class MovieActor
    {
        public int MovieId { get; set; }

        public int ActorId { get; set; }

        [StringLength(50, ErrorMessage = "Tối đa 50 kí tự")]
        public string Character { get; set; }

        public int Order { get; set; }

        public Movie Movie { get; set; }

        public Actor Actor { get; set; }
    }
}
