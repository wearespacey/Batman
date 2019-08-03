using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL
{
    public class AcousticDataAccess
    {
        private BatmanContext _context;

        public AcousticDataAccess(BatmanContext context)
        {
            _context = context;
        }
        public Task<List<AcousticData>> GetAll()
        {
            return _context.AcousticDatas.ToListAsync();
        }
        public Task<AcousticData> Get(int id)
        {
            return _context.AcousticDatas.Where(a => a.Id == id).FirstAsync();
        }

        public void Add(AcousticData add)
        {
            _context.AcousticDatas.Add(add);
        }
    }
}