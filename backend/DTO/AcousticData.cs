using System;
using System.ComponentModel.DataAnnotations.Schema;
using backend.DTO;

namespace backend.DTO
{
    public class AcousticData
    {
        public int Id {get;set;}
        public String SpeciesId {get;set;}
        public int PositiveMinute {get;set;}
        public int ContactNumbers {get;set;}
        public String Validation {get;set;}
        public int RecordId {get;set;}
    }
}