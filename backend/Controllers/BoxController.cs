using System;
using AutoMapper;
using backend.DAL;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using backend.DTO;
using System.Linq;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoxController : ControllerBase
    {
        private IMapper _mapper;
        private BoxDataAccess _boxDataAccess;

        public BoxController(BatmanContext context, IMapper mapper)
        {
            _mapper = mapper;
            _boxDataAccess = new BoxDataAccess(context);
        }

        [HttpGet]
        public ActionResult<List<Box>> Get()
        {
            return (_boxDataAccess.GetBoxesAsync()).Result.Select(_mapper.Map<DTO.Box>).ToList();
        }

        [HttpGet("{name}")]
        public ActionResult<Box> Get(String boxId)
        {
            Models.Box boxFound = _boxDataAccess.GetBoxById(boxId);
            if(boxFound == null) return NotFound();
            return _mapper.Map<DTO.Box>(boxFound);
        }

        [HttpPost]
        public ActionResult<Box> AddBox([FromBody]Box box)
        {
            if(box == null) return BadRequest();
            _boxDataAccess.AddBox(_mapper.Map<Models.Box>(box));
            return Created("/box/" + box.Name, box);
        }
    }
}