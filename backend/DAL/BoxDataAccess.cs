using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL
{
    public class BoxDataAccess
    {
        private BatmanContext _context;

        public BoxDataAccess(BatmanContext context)
        {
            _context = context;
        }
        public Task<List<Box>> GetBoxes()
        {
            return _context.Boxes.ToListAsync();
        }

        public void AddBox(Box boxLocation)
        {
            _context.Boxes.Add(boxLocation);
        }
    }
}