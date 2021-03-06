using AutoMapper;
using Microsoft.AspNetCore.Identity;
using MyAPI.DTOs;
using MyAPI.DTOs.User;
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

            CreateMap<Movie, MovieDTO>()
                .ForMember(des => des.Actors, opt => opt.MapFrom(MapActorMovieDTO))
                .ForMember(des => des.Genres, opt => opt.MapFrom(MapGenreDTO))
                .ForMember(des => des.MovieTheaters, opt => opt.MapFrom(MapMovieTheaterDTO));

            CreateMap<IdentityUser, UserDTO>();
        }

        private List<MovieTheaterDTO> MapMovieTheaterDTO(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<MovieTheaterDTO>();

            if (movie.MovieTheaterMovies != null)
            {
                foreach (var item in movie.MovieTheaterMovies)
                {
                    result.Add(new MovieTheaterDTO()
                    {
                        Id = item.MovieTheaterId,
                        Name = item.MovieTheater.Name,
                        Latitude = item.MovieTheater.Location.Coordinate.Y,
                        Longitude = item.MovieTheater.Location.Coordinate.X
                    });
                }
            }

            return result;
        }

        private List<GenreDTO> MapGenreDTO(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<GenreDTO>();

            if (movie.MovieGenres != null)
            {
                foreach (var item in movie.MovieGenres)
                {
                    result.Add(new GenreDTO() { Id = item.GenreId, Name = item.Genre.Name });
                }
            }

            return result;
        }

        private List<ActorMovieDTO> MapActorMovieDTO(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<ActorMovieDTO>();

            if (movie.MovieActors != null)
            {
                foreach (var item in movie.MovieActors)
                {
                    result.Add(new ActorMovieDTO()
                    {
                        Id = item.ActorId,
                        Character = item.Character,
                        Name = item.Actor.Name,
                        Order = item.Order,
                        Picture = item.Actor.Picture
                    });
                }
            }

            return result;
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
