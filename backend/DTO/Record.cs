using System;

namespace backend.DTO
{
    public class Record
    {
        public int Id {get;set;}
        public DateTime StartHour {get;set;}
        public DateTime EndHour {get;set;}
        public String RecordUrl {get;set;}
        public String ProjectId {get;set;}
        public Project Project {get;set;}
    }
}