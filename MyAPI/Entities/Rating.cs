using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Entities
{
    public class Rating
    {
        public int Id { get; set; }

        [Range(minimum: 1, maximum: 5)]
        public int RateStar { get; set; }

        public string UserId { get; set; }

        public int MovieId { get; set; }

        public Movie Movie { get; set; }

        public IdentityUser User { get; set; }
    }
}
