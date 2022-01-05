using AutoMapper;
using MyAPI.DTOs;
using MyAPI.Entities;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile(GeometryFactory geometryFactory)
        {
            CreateMap<GenreDTO, Genre>().ReverseMap();

            CreateMap<GenreCreationDTO, Genre>();

            CreateMap<ActorDTO, Actor>().ReverseMap();

            CreateMap<ActorCreationDTO, Actor>()
                .ForMember(des => des.Picture, opt => opt.Ignore());

            CreateMap<MovieTheater, MovieTheaterDTO>()
                .ForMember(des => des.Latitude, opt => opt.MapFrom(src => src.Location.Coordinate.Y))
                .ForMember(des => des.Longitude, opt => opt.MapFrom(src => src.Location.Coordinate.X));

            CreateMap<MovieTheaterCreationDTO, MovieTheater>()
                .ForMember(des => des.Location, opt => opt.MapFrom(src =>
                geometryFactory.CreatePoint(new Coordinate(src.Longitude, src.Latitude))));

            CreateMap<MovieCreationDTO, Movie>()
                .ForMember(des => des.Poster, opt => opt.Ignore())
                .ForMember(des => des.MovieGenres, opt => opt.MapFrom(MapMovieGenres))
                .ForMember(des => des.MovieTheaterMovies, opt => opt.MapFrom(MapMovieTheaterMovies))
                .ForMember(des => des.MovieActors, opt => opt.MapFrom(MapMovieActors));
        }

        private List<MovieActor> MapMovieActors(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MovieActor>();

            if (movieCreationDTO.Actors == null) { return result; }

            foreach (var actor in movieCreationDTO.Actors)
            {
                result.Add(new MovieActor() { ActorId = actor.Id, Character = actor.Character });
            }

            return result;
        }

        private List<MovieTheaterMovie> MapMovieTheaterMovies(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MovieTheaterMovie>();

            if (movieCreationDTO.MovieTheaterIds == null) { return result; }

            foreach (var id in movieCreationDTO.MovieTheaterIds)
            {
                result.Add(new MovieTheaterMovie() { MovieTheaterId = id });
            }
            return result;
        }

        private List<MovieGenre> MapMovieGenres(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MovieGenre>();

            if (movieCreationDTO.GenreIds == null) { return result; }

            foreach (var id in movieCreationDTO.GenreIds)
            {
                result.Add(new MovieGenre() { GenreId = id });
            }
            return result;
        }
    }
}
