using System;
using System.Collections.Generic;
using System.Linq;
using backend.Models;


namespace backend.DAL
{
    public class RecordDataAccess
    {
        private BatmanContext _context;

        public RecordDataAccess(BatmanContext context){
            _context = context;
        }

        public List<Record> GetRecords()
        {
            return _context.Records.ToList();
        }

        public Record GetRecordById(int recordId)
        {
            return _context.Records.Where(r => r.Id == recordId).FirstOrDefault();
        }

        public void AddRecord(Record record)
        {
            _context.Records.Add(record);
            _context.SaveChangesAsync();
        }

        public void UpdateRecord(Record record){
            _context.SaveChanges();
        }
        
    }
}