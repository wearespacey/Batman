using System;
using System.Collections.Generic;
using System.Linq;
using backend.Models;
using Microsoft.EntityFrameworkCore;

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
            return _context.BoxLocations.Include(a => a.Records).ThenInclude(r => r.First().AcousticData).ToList();
        }

        public BoxLocation GetBoxLocationById(int boxLocationId)
        {
            return _context.BoxLocations.Where(b => b.Id == boxLocationId).FirstOrDefault();
        }

        public void AddBoxLocation(BoxLocation boxLocation)
        {
            _context.BoxLocations.Add(boxLocation);
            _context.SaveChangesAsync();
        }

        internal IEnumerable<BoxLocation> GetBoxNotFinishLocations()
        {
            return _context.BoxLocations.Where(a => a.EndDay == null).ToList();
        }
    }
}