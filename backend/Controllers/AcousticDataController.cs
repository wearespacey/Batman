using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DAL;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcousticDataController : ControllerBase
    {
        private IMapper _mapper;
        private AcousticDataAccess _dataAccess;
        public AcousticDataController(BatmanContext context, IMapper mapper)
        {
            _mapper = mapper;
            _dataAccess = new AcousticDataAccess(context);
        }

        // GET api/AcousticData/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AcousticData>>> GetAll()
        {
            return Ok((await _dataAccess.GetAll()).Select(_mapper.Map<DTO.AcousticData>).ToList());
        }
        // GET api/AcousticData/{ID}
        [HttpGet("{id}")]
        public async Task<ActionResult<AcousticData>> GetById(int id)
        {
            return Ok(_mapper.Map<DTO.AcousticData>(await _dataAccess.Get(id)));
        }
        // GET api/AcousticData/record/{ID}
        [HttpGet("record/{id}")]
        public async Task<ActionResult<IEnumerable<AcousticData>>> GetByRecord(int id)
        {
            return Ok((await _dataAccess.GetAll()).Where(a=>a.RecordId == id).Select(_mapper.Map<DTO.AcousticData>).ToList());
        }
    }
}