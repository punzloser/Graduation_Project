using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.DTOs
{
    public class RatingDTO
    {
        [Range(minimum: 1, maximum: 5)]
        public int RateStar { get; set; }

        public int MovieId { get; set; }
    }
}
