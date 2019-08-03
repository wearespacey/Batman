using System;
using backend.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Project
    {
        [Key]
        public String Name {get;set;}

        public virtual List<Record> Records {get;set;}
    }
}