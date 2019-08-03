using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;

namespace backend.Models
{
    public class Record
    {
        public int Id {get;set;}
        public DateTime StartHour {get;set;}
        public DateTime EndHour {get;set;}
        public String RecordUrl {get;set;}
        public String ProjectId {get;set;}
        public int BoxLocationId {get;set;}

        [ForeignKey("BoxLocationId")]
        public virtual BoxLocation BoxLocation {get;set;}
        [ForeignKey("ProjectId")]
        public virtual Project Project {get;set;}
        public virtual List<AcousticData> AcousticData {get;set;}
    }
}