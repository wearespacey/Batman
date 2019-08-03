using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SelectOptionController : ControllerBase
    {
        private IMapper _mapper;
        private BoxDataAccess _boxDataAccess;
        private OperatorAccess _operatorAccess;
        public SelectOptionController(BatmanContext context, IMapper mapper)
        {
            _mapper = mapper;
            _operatorAccess = new OperatorAccess(context);
            _boxDataAccess = new BoxDataAccess(context);
        } 

        // GET api/SelectOption/Habitat1
        [HttpGet("Habitat1")]
        public ActionResult<IEnumerable<string>> GetHabitat1()
        {
            return new string[] {
                "Cavité - carrière, mine et grotte",
                "Bâtiments",
                "Plan d'eau - mare (< 50m²)",
                "Plan d'eau - étang (>50m²)",
                "Cours d'eau - fleuves et gd rivières (L >10 m)",
                "Cours d'eau - ruisseau (L < 3m)",
                "Cours d'eau - rivière (3m< L< 10m)",
                "Milieux rocheux",
                "Forêt feuillue",
                "Forêt résineuse",
                "Forêt mixte",
                "Mise à blanc",
                "Lisière vraie (milieu ouvert/milieux forestier)",
                "Prairie",
                "Culture",
                "Prairie/culture",
                "Pelouse, Lande",
                "Zone urbanisée (ville , village)",
                "autres"
            };
        }


        // GET api/SelectOption/BoxID
        [HttpGet("BoxID")]
        public async Task<ActionResult<IEnumerable<string>>> GetBoxIDAsync()
        {
            return Ok( (await _boxDataAccess.GetBoxesAsync()).Select(_mapper.Map<DTO.Box>).Select(a => a.Name).ToList());
        }

        // GET api/SelectOption/OperatorName
        [HttpGet("OperatorName")]
        public async Task<ActionResult<IEnumerable<string>>> GetOperatorNameAsync()
        {
            return Ok((await _operatorAccess.GetOperators()).Select(_mapper.Map<DTO.Operator>).Select(a => a.Name).ToList() ) ;
        }
    }
}