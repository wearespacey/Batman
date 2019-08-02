using System;
using backend.Models;
using System.Collections.Generic;

namespace backend.Models
{
    public class Box
    {
        public int Id {get;set;}
        public String Name {get;set;}

        public virtual List<BoxLocation> BoxLocations {get;set;}
    }
}