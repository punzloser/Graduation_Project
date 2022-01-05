﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyAPI.DTOs;
using MyAPI.Entities;
using MyAPI.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static MyAPI.Constants.SystemConstants;

namespace MyAPI.Controllers
{
    [Route("api/phim")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;

        public MovieController(MyDbContext db, IMapper mapper, IFileStorageService fileStorageService)
        {
            _db = db;
            _mapper = mapper;
            _fileStorageService = fileStorageService;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] MovieCreationDTO movieCreationDTO)
        {
            var result = _mapper.Map<Movie>(movieCreationDTO);

            if (movieCreationDTO.Poster != null)
            {
                result.Poster = await _fileStorageService.SaveFile(ContainerName.movies, movieCreationDTO.Poster);
            }

            ArrangeActorOrder(result);

            _db.Add(result);
            await _db.SaveChangesAsync();
            return Ok(result.Id);
        }

        private void ArrangeActorOrder(Movie result)
        {
            if (result.MovieActors != null)
            {
                for (int i = 0; i < result.MovieActors.Count; i++)
                {
                    result.MovieActors[i].Order = i;
                }
            }
        }

        [HttpGet("postget")]
        public async Task<ActionResult<MoviePostGetDTO>> PostGet()
        {
            var genres = await _db.Genres.ToListAsync();
            var movieTheaters = await _db.MovieTheaters.ToListAsync();

            var movieTheaterDTOs = _mapper.Map<List<MovieTheaterDTO>>(movieTheaters);
            var genreDTOs = _mapper.Map<List<GenreDTO>>(genres);

            return new MoviePostGetDTO()
            {
                Genres = genreDTOs,
                MovieTheaters = movieTheaterDTOs
            };
        }
    }
}
