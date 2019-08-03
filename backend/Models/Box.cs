using System;
using backend.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Box
    {
        [Key]
        public String Name {get;set;}

        public virtual List<BoxLocation> BoxLocations {get;set;}
    }
}