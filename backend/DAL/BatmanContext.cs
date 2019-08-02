using Microsoft.EntityFrameworkCore;
using System;
using backend.Models;

namespace backend.DAL
{
    public class BatmanContext : DbContext
    {
        public BatmanContext(){}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){}

        protected override void OnModelCreating(ModelBuilder modelBuilder){}

        //DB Set
        public DbSet<AcousticData> AcousticDatas {get;set;}
        public DbSet<Box> Boxes {get;set;}
        public DbSet<BoxLocation> BoxLocations {get;set;}
        public DbSet<Operator> Operators {get;set;}
        public DbSet<Project> Projects {get;set;}
        public DbSet<Record> Records {get;set;}

    }
}