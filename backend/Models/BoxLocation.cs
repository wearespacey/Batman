using System;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;
using System.Collections.Generic;

namespace backend.Models
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
        public String BoxId {get;set;}
        public String OperatorId {get;set;}

        [ForeignKey("OperatorId")]
        public virtual Operator Operator {get;set;}
        [ForeignKey("BoxId")]
        public virtual Box Box {get;set;}
        public virtual List<Record> Records {get;set;}
    }
}