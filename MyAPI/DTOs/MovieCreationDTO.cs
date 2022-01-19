using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyAPI.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.DTOs
{
    public class MovieCreationDTO
    {
        [Required(ErrorMessage = "Nhập tựa phim")]
        [StringLength(50, ErrorMessage = "Tối đa 50 kí tự")]
        public string Title { get; set; }

        public string Trailer { get; set; }

        public string Summary { get; set; }

        public DateTime ReleaseDate { get; set; }

        public bool InTheaters { get; set; }

        public IFormFile Poster { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> GenreIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> MovieTheaterIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<MovieActorCreationDTO>>))]
        public List<MovieActorCreationDTO> Actors { get; set; }

    }
}
