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
    public class BoxController
    {
        private IMapper _mapper;
        private BoxDataAccess _boxDataAccess;

        public BoxController(BatmanContext context, IMapper mapper)
        {
            _mapper = mapper;
            _boxDataAccess = new BoxDataAccess(context);
        }

        [HttpGet]  
        [Route("api/box")]
        public async System.Threading.Tasks.Task<List<Box>> GetBoxesAsync()
        {
            return (await _boxDataAccess.GetBoxes()).Select(_mapper.Map<DTO.Box>).ToList();
        }

        [HttpPost]
        [Route("api/box")]
        public void AddBox([FromBody]Box box)
        {
            _boxDataAccess.AddBox(_mapper.Map<Models.Box>(box));
        }
    }
}