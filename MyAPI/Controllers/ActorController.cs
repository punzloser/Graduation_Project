using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyAPI.DTOs;
using MyAPI.Entities;
using MyAPI.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static MyAPI.Constants.SystemConstants;

namespace MyAPI.Controllers
{
    [Route("api/dien-vien")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;

        public ActorController(MyDbContext db, IMapper mapper, IFileStorageService fileStorageService)
        {
            _db = db;
            _mapper = mapper;
            _fileStorageService = fileStorageService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = _db.Actors.AsQueryable();
            await HttpContext.InsertParametesPaginationInHeader(queryable);

            var result = await queryable.OrderBy(a => a.Name)
                .Paginate(paginationDTO)
                .ToListAsync();

            return Ok(_mapper.Map<List<ActorDTO>>(result));
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ActorDTO>> GetById(int id)
        {
            var result = await _db.Actors.FindAsync(id);
            if (result != null)
                return Ok(_mapper.Map<ActorDTO>(result));
            return NotFound();

        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ActorCreationDTO actorCreation)
        {
            var result = _mapper.Map<Actor>(actorCreation);

            if (actorCreation.Picture != null)
            {
                result.Picture =
                    await _fileStorageService.SaveFile(ContainerName.actors, actorCreation.Picture);
            }
            _db.Add(result);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ActorCreationDTO actorCreation)
        {
            var result = await _db.Actors.FindAsync(id);
            if (result != null)
            {
                if (actorCreation.Picture != null)
                {
                    result.Picture =
                        await _fileStorageService.EditFile(ContainerName.actors, actorCreation.Picture, result.Picture);
                }
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
        public async Task<ActionResult> Del(int id)
        {
            var del = await _db.Actors.FindAsync(id);
            if (del != null)
            {
                if (del.Picture != null)
                {
                    await _fileStorageService.DelFile(ContainerName.actors, del.Picture);
                }
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
