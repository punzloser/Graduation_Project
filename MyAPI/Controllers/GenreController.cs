using Microsoft.AspNetCore.Mvc;
using MyAPI.Entities;
using MyAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Controllers
{
    [Route("api/genre")]
    public class GenreController : ControllerBase
    {
        private readonly IRepo _repo;

        public GenreController(IRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public List<Genre> Get()
        {
            return _repo.GetListGenres();
        }

        [HttpGet]
        public Genre GetById(int Id)
        {
            var genre = _repo.GetById(Id);
            if (genre == null)
            {
                //return NotFound();
            }
            return genre;
        }
    }
}
