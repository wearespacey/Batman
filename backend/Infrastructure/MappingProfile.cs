using AutoMapper;
using System;
using backend.Models;
using backend.DTO;

namespace backend.Infrastructure
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Models.BoxLocation, DTO.BoxLocation>();
            CreateMap<DTO.BoxLocation, Models.BoxLocation>();
            CreateMap<Models.Box, DTO.Box>();
            CreateMap<DTO.Box, Models.Box>();
            CreateMap<Models.Operator, DTO.Operator>();
            CreateMap<DTO.Operator, Models.Operator>();
            CreateMap<DTO.AcousticData, Models.AcousticData>();
            CreateMap<Models.AcousticData, DTO.AcousticData>();
        }
    }
}