using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using MyAPI.DTOs;
using MyAPI.Entities;
using MyAPI.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Controllers
{
    [Route("api/the-loai")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class GenreController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly IMapper _mapper;

        public GenreController(MyDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<GenreDTO>>> Get([FromQuery] PaginationDTO pagination)
        {
            var queryable = _db.Genres.AsQueryable();
            await HttpContext.InsertParametesPaginationInHeader(queryable);
            var result = await queryable.OrderBy(a => a.Name)
                .Paginate(pagination)
                .ToListAsync();

            return Ok(_mapper.Map<List<GenreDTO>>(result));

        }

        [HttpGet("all")]
        [AllowAnonymous]
        public async Task<ActionResult<List<GenreDTO>>> Get()
        {
            var result = await _db.Genres.OrderBy(a => a.Name).ToListAsync();

            return Ok(_mapper.Map<List<GenreDTO>>(result));
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<GenreDTO>> GetById(int id)
        {
            var result = await _db.Genres.FindAsync(id);

            if (result != null)
                return Ok(_mapper.Map<GenreDTO>(result));
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenreCreationDTO genreCreation)
        {
            var result = _mapper.Map<Genre>(genreCreation);

            _db.Add(result);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] GenreCreationDTO genreCreation)
        {
            var result = await _db.Genres.FindAsync(id);
            if (result != null)
            {
                _mapper.Map(genreCreation, result);
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
