using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyAPI.DTOs;
using MyAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Controllers
{
    [Route("api/dien-vien")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly IMapper _mapper;

        public ActorController(MyDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActorDTO>>> Get()
        {
            var result = await _db.Actors.ToListAsync();
            _mapper.Map<List<ActorDTO>>(result);

            return Ok(result);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<ActorDTO>> GetById(int Id)
        {
            var result = await _db.Actors.FindAsync(Id);
            if (result != null)
                return Ok(_mapper.Map<ActorDTO>(result));
            return NotFound();

        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ActorCreationDTO actorCreation)
        {
            var result = _mapper.Map<Actor>(actorCreation);

            _db.Add(result);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{Id:int}")]
        public async Task<ActionResult> Put(int Id, [FromBody] ActorCreationDTO actorCreation)
        {
            var result = await _db.Actors.FindAsync(Id);
            if (result != null)
            {
                _mapper.Map(actorCreation, result);
                await _db.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return NotFound();
            }

        }

        [HttpDelete]
        public async Task<ActionResult> Del(int Id)
        {
            var del = await _db.Actors.FindAsync(Id);
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
