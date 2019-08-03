using System;
using System.Collections.Generic;
using backend.DTO;

namespace backend.DTO
{
    public class BoxLocation
    {
        public int Id {get;set;}
        public DateTime StartDay {get;set;}
        public DateTime? EndDay {get;set;}
        public String Latitude {get;set;}
        public String Longitude {get;set;}
        public String SiteName {get;set;}
        public String Habitat1 {get;set;}
        public String Habitat2 {get;set;}
        public Operator Operator {get;set;}
        public Box Box {get;set;}
    }
}