using System;
using System.Collections.Generic;
using System.Linq;
using backend.Models;

namespace backend.DAL
{
    public class BoxDataAccess
    {
        private BatmanContext _context;

        public BoxDataAccess(BatmanContext context)
        {
            _context = context;
        }

        public List<Box> GetBoxes()
        {
            return _context.Boxes.ToList();
        }

        public void AddBox(Box boxLocation)
        {
            _context.Boxes.Add(boxLocation);
        }
    }
}