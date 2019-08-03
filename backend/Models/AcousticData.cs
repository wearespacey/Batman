using System;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;

namespace backend.Models
{
    public class AcousticData
    {
        public int Id {get;set;}
        public String SpeciesId {get;set;}
        public int PositiveMinute {get;set;}
        public int ContactNumbers {get;set;}
        public String Validation {get;set;}
        public int RecordId {get;set;}

        [ForeignKey("RecordId")]
        public virtual Record Record {get;set;}

    }
}