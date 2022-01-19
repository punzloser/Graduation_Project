using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.DTOs
{
    public class MovieTheaterCreationDTO
    {
        [Required]
        [StringLength(50, ErrorMessage = "Tối đa 50 kí tự")]
        public string Name { get; set; }

        [Range(-90, 90, ErrorMessage = "Vĩ độ -90 -> 90")]
        public double Latitude { get; set; }

        [Range(-180, 180, ErrorMessage = "Kinh độ -180 -> 180")]
        public double Longitude { get; set; }
    }
}
