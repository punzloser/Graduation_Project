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

            //CreateMap<MovieTheaterDTO, MovieTheater>()
            //    .ForMember(des => des.Location.Coordinate.X, opt => opt.MapFrom(src => src.Latitude));

            //CreateMap<MovieTheaterDTO, MovieTheater>()
            //    .ForMember(des => des.Location.Coordinate.Y, opt => opt.MapFrom(src => src.Longitude));

            CreateMap<MovieTheater, MovieTheaterDTO>()
                .ForMember(des => des.Latitude, opt => opt.MapFrom(src => src.Location.Coordinate.X));

            CreateMap<MovieTheater, MovieTheaterDTO>()
                .ForMember(des => des.Longitude, opt => opt.MapFrom(src => src.Location.Coordinate.Y));

            //CreateMap<MovieTheaterCreationDTO, MovieTheater>()
            //    .ForMember(des => des.Location, opt => opt.MapFrom(src =>
            //    geometryFactory.CreatePoint(new Coordinate(src.Latitude, src.Longitude))));

            CreateMap<MovieTheaterCreationDTO, MovieTheater>()
                .ForMember(des => des.Location, opt => opt.MapFrom(src =>
                geometryFactory.CreatePoint(new Coordinate(src.Longitude, src.Latitude))));
        }
    }
}
