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
    public class RecordController: ControllerBase{
        
        private RecordDataAccess _recordDataAccess;
        private IMapper _mapper;

        public RecordController(BatmanContext context, IMapper mapper)
        {
            _recordDataAccess = new RecordDataAccess(context);
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<Record>> Get()
        {
            return _recordDataAccess.GetRecords().Select(_mapper.Map<DTO.Record>).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Record> Get(int recordId)
        {
            Models.Record recordFound = _recordDataAccess.GetRecordById(recordId);
            if(recordFound == null) return NotFound();
            return Ok(_mapper.Map<DTO.Record>(recordFound));
        }

        [HttpPost]
        public ActionResult<Record> AddRecord([FromBody]DTO.Record recordDTO)
        {
            _recordDataAccess.AddRecord(_mapper.Map<Models.Record>(recordDTO));
            return Created("/record/" + recordDTO.Id, recordDTO);
        }

        [HttpPut("{id}")]
        public ActionResult<Record> Put(int recordId, [FromBody] DTO.Record recordDTO)
        {
            if(recordDTO == null) return BadRequest();
            if(Get(recordId) == null) return NotFound();
            
            _recordDataAccess.UpdateRecord(_mapper.Map<Models.Record>(recordDTO));
            return Ok();
        }

    }
}