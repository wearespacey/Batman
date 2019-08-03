using System;
using System.Collections.Generic;
using System.Linq;
using backend.Models;

namespace backend.DAL
{
    public class BoxLocationDataAccess
    {
        private BatmanContext _context;

        public BoxLocationDataAccess(BatmanContext context)
        {
            _context = context;
        }

        public List<BoxLocation> GetBoxLocations()
        {
            return _context.BoxLocations.ToList();
        }

        public void AddBoxLocation(BoxLocation boxLocation)
        {
            _context.BoxLocations.Add(boxLocation);
        }
    }
}