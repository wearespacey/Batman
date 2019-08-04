using System;
using AutoMapper;
using backend.DAL;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using backend.DTO;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoxLocationController : ControllerBase
    {
        private BoxLocationDataAccess _boxLocationDataAccess;
        private IMapper _mapper;

        public BoxLocationController(BatmanContext context, IMapper mapper)
        {
            _boxLocationDataAccess = new BoxLocationDataAccess(context);
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<BoxLocation>> Get()
        {
            return _boxLocationDataAccess.GetBoxLocations().Select(_mapper.Map<DTO.BoxLocation>).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<BoxLocation> Get(int boxLocationId)
        {
            Models.BoxLocation boxLocationFound = _boxLocationDataAccess.GetBoxLocationById(boxLocationId);
            if(boxLocationFound == null) return NotFound();
            return Ok(_mapper.Map<DTO.BoxLocation>(boxLocationFound));
        }

        [HttpGet("notfinish")]
        public ActionResult<List<BoxLocation>> GetNotfinish()
        {
            var boxLocations = new List<BoxLocation>();

            foreach(var box in _boxLocationDataAccess.GetBoxNotFinishLocations().Select(_mapper.Map<DTO.BoxLocation>))
            {
                box.Latitude.Replace(',', '.');
                box.Longitude.Replace(',', '.');
                boxLocations.Add(box);
            }

            return boxLocations;
        }

        [HttpPost]
        public ActionResult<BoxLocation> AddBoxLocation([FromBody]BoxLocation boxLocation)
        {
            if(boxLocation == null) return BadRequest();
            _boxLocationDataAccess.AddBoxLocation(_mapper.Map<Models.BoxLocation>(boxLocation));
            return Created("/BoxLocation/" + boxLocation.Id, boxLocation);
        }
    }
}