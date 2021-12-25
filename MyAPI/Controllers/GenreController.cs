using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
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
        private readonly MyDbContext _db;

        public GenreController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Genre>>> Get()
        {
            return await _db.Genres.ToListAsync();
        }


        [HttpGet("{Id}")]
        public async Task<ActionResult<Genre>> GetById(int Id)
        {
            var result = await _db.Genres.FindAsync(Id);

            if (result != null)
                return Ok(result);
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Genre g)
        {
            _db.Add(g);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] Genre g)
        {
            var result = await _db.Genres.FindAsync(g.Id);
            if (result != null)
            {
                result.Name = g.Name;
                await _db.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete]
        public async Task<ActionResult> Del(int id)
        {
            var del = await _db.Genres.FindAsync(id);
            if (del != null)
            {
                _db.Remove(del);
                await _db.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
