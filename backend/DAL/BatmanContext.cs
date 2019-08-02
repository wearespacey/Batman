using Microsoft.EntityFrameworkCore;
using System;

namespace backend.DAL
{
    public class BatmanContext : DbContext
    {
        public BatmanContext(){}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){}

        protected override void OnModelCreating(ModelBuilder modelBuilder){}

        //DB Set
        
    }
}