using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MyAPI.Entities;
using MyAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Controllers
{
    [Route("api/the-loai")]
    public class GenreController : ControllerBase
    {
        private readonly IRepo _repo;

        public GenreController(IRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<List<Genre>> Get()
        {
            return await _repo.GetListGenres();
        }


        [HttpGet("{Id}")]
        public async Task<ActionResult<Genre>> GetById(int Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var genre = await _repo.GetById(Id);
            if (genre == null)
            {
                return NotFound();
            }
            return genre;
        }

        [HttpPost]
        public ActionResult Post([FromBody] Genre g)
        {
            return NoContent();
        }

        [HttpPut]
        public ActionResult Put([FromForm] Genre g)
        {
            return NoContent();
        }

        [HttpDelete]
        public ActionResult Del(Genre g)
        {
            return NoContent();
        }
    }
}
