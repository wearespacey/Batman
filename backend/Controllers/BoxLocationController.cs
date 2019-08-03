using System;
using AutoMapper;
using backend.DAL;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using backend.DTO;
using System.Linq;

namespace backend.Controllers
{
    [Controller]
    public class BoxLocationController
    {
        private BoxLocationDataAccess _boxLocationDataAccess;
        private IMapper _mapper;

        public BoxLocationController(BatmanContext context, IMapper mapper)
        {
            _boxLocationDataAccess = new BoxLocationDataAccess(context);
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/boxLocation")]
        public List<BoxLocation> GetBoxLocations()
        {
            return _boxLocationDataAccess.GetBoxLocations().Select(_mapper.Map<DTO.BoxLocation>).ToList();
        }

        [HttpPost]
        [Route("api/boxLocation")]
        public void AddBoxLocation([FromBody]BoxLocation boxLocation)
        {
            _boxLocationDataAccess.AddBoxLocation(_mapper.Map<Models.BoxLocation>(boxLocation));
        }
    }
}