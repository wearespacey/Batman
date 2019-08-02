using System;
using backend.Models;
using System.Collections.Generic;

namespace backend.Models
{
    public class Project
    {
        public int Id {get;set;}
        public String Name {get;set;}

        public virtual List<Record> Records {get;set;}
    }
}