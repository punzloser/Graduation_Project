using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MyAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Controllers
{
    [Route("api/the-loai")]
    [ApiController]
    public class GenreController : ControllerBase
    {

        public GenreController()
        {

        }

        [HttpGet]
        public async Task<ActionResult<List<Genre>>> Get()
        {
            return new List<Genre>()
            {
                new Genre(){Id = 1, Name = "Comedy"}
            };
        }


        [HttpGet("{Id}")]
        public async Task<ActionResult<Genre>> GetById(int Id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public ActionResult Post([FromBody] Genre g)
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        public ActionResult Put([FromForm] Genre g)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        public ActionResult Del(Genre g)
        {
            throw new NotImplementedException();
        }
    }
}
