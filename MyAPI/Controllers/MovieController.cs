using AutoMapper;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<MovieDTO>> GetDetail(int id)
        {
            var movie = await _db.Movies
                .Include(a => a.MovieActors).ThenInclude(a => a.Actor)
                .Include(a => a.MovieGenres).ThenInclude(a => a.Genre)
                .Include(a => a.MovieTheaterMovies).ThenInclude(a => a.MovieTheater)
                .FirstOrDefaultAsync(a => a.Id == id);

            var result = _mapper.Map<MovieDTO>(movie);
            result.Actors.OrderBy(a => a.Order).ToList();

            return result;
        }

        [HttpGet]
        public async Task<ActionResult<LandingPageDTO>> Get()
        {
            var today = DateTime.Today;

            //var upComingReleases = await (from m in _db.Movies
            //                              where m.ReleaseDate > today
            //                              orderby m.ReleaseDate
            //                              select m)
            //                              .Take(Top)
            //                              .ToListAsync();

            //var inTheaters = await (from m in _db.Movies
            //                        where m.InTheaters == true
            //                        orderby m.ReleaseDate
            //                        select m)
            //                        .ToListAsync();

            var upComingReleases = await _db.Movies
                .Where(a => a.ReleaseDate > today)
                .OrderBy(a => a.ReleaseDate)
                .Take(Top)
                .ToListAsync();

            var inTheaters = await _db.Movies
                .Where(a => a.InTheaters)
                .OrderBy(a => a.ReleaseDate)
                .Take(Top)
                .ToListAsync();

            var result = new LandingPageDTO()
            {
                UpcomingReleases = _mapper.Map<List<MovieDTO>>(upComingReleases),
                InTheaters = _mapper.Map<List<MovieDTO>>(inTheaters)
            };

            return result;
        }

        [HttpGet("putget/{id}")]
        public async Task<ActionResult<MoviePutGetDTO>> PutGet(int id)
        {
            var movieActionResult = await GetDetail(id);
            if (movieActionResult.Result is NotFoundResult) { return NotFound(); }
            var movie = movieActionResult.Value;

            var selectedGenreIds = movie.Genres.Select(a => a.Id).ToList();

            var nonSelectedGenre =
                await _db.Genres.Where(a => !selectedGenreIds.Contains(a.Id)).ToListAsync();

            var selectedMovieTheaterIds = movie.MovieTheaters.Select(a => a.Id).ToList();

            var nonSelectedMovieTheater =
                await _db.MovieTheaters.Where(a => !selectedMovieTheaterIds.Contains(a.Id)).ToListAsync();

            var result = new MoviePutGetDTO()
            {
                Movie = movie,
                Actors = movie.Actors,
                NonSelectedGenres = _mapper.Map<List<GenreDTO>>(nonSelectedGenre),
                SelectedGenres = movie.Genres,
                NonSelectedMovieTheaters = _mapper.Map<List<MovieTheaterDTO>>(nonSelectedMovieTheater),
                SelectedMovieTheaters = movie.MovieTheaters
            };

            return result;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutGet(int id, [FromForm] MovieCreationDTO movieCreationDTO)
        {
            var result = await _db.Movies
                .Include(a => a.MovieActors)
                .Include(a => a.MovieGenres)
                .Include(a => a.MovieTheaterMovies).FirstOrDefaultAsync(a => a.Id == id);

            if (result != null)
            {
                _mapper.Map(movieCreationDTO, result);

                if (movieCreationDTO.Poster != null)
                {
                    result.Poster = await
                        _fileStorageService.EditFile(ContainerName.movies, movieCreationDTO.Poster, result.Poster);
                }
                ArrangeActorOrder(result);
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
            var del = await _db.Movies.FindAsync(id);
            if (del == null)
                return NotFound();

            _db.Remove(del);
            await _db.SaveChangesAsync();

            if (del.Poster != null)
            {
                await _fileStorageService.DelFile(ContainerName.movies, del.Poster);
            }

            return Ok();
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<MovieDTO>>> Filter([FromQuery] FilterMovieDTO filterMovieDTO)
        {
            var queryable = _db.Movies.AsQueryable();
            await HttpContext.InsertParametesPaginationInHeader(queryable);

            if (!string.IsNullOrEmpty(filterMovieDTO.Title))
            {
                //queryable = from q in queryable
                //            where q.Title.Contains(filterMovieDTO.Title)
                //            select q;

                queryable = queryable.Where(a => a.Title.Contains(filterMovieDTO.Title));
            }

            if (filterMovieDTO.UpcomingReleases)
            {
                var today = DateTime.Today;
                queryable = queryable.Where(a => a.ReleaseDate > today);
            }

            if (filterMovieDTO.InTheaters)
            {
                queryable = queryable.Where(a => a.InTheaters == true);
            }

            if (filterMovieDTO.GenreId != 0)
            {
                //queryable = from q in queryable
                //            where q.MovieGenres.Select(a => a.GenreId).Contains(filterMovieDTO.GenreId)
                //            select q;

                queryable = queryable
                    .Where(a => a.MovieGenres.Select(b => b.GenreId)
                    .Contains(filterMovieDTO.GenreId));
            }

            var result = await queryable
                .Paginate(filterMovieDTO.PaginationDTO)
                .OrderBy(a => a.Title)
                .ToListAsync();

            return Ok(_mapper.Map<List<MovieDTO>>(result));
        }
    }
}
