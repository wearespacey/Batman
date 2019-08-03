using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL
{
    public class OperatorAccess
    {
        private BatmanContext _context;

        public OperatorAccess(BatmanContext context)
        {
            _context = context;
        }

        public Task<List<Operator>> GetOperators()
        {
            return _context.Operators.ToListAsync();
        }

        public void AddOperator(Operator operatorDto)
        {
            _context.Operators.Add(operatorDto);
        }
    }
}