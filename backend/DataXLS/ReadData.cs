using System;
using System.IO;
using OfficeOpenXml;
using backend.DAL;
using System.Linq;
using backend.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace backend.DataXLS
{
    public class ReadData : IDisposable
    {
        private BatmanContext _context;
        public const int MAX_ROW = 1000 /*18188*/;

        public ReadData(BatmanContext context)
        {
            _context = context;
        }
        public void ReadFile()
        {
            InsertAll();
        }

        public String checkContent(object value)
        {
            return value is null? "" : value.ToString();
        }

        private async void InsertAll()
        {
            var file = new FileInfo("DataXLS/Données acoustiques_18102018.xlsx");
            using(ExcelPackage excelPackage = new ExcelPackage(file))
            {
                var _worksheet = excelPackage.Workbook.Worksheets[1];
                String previousBox = "null";
                EntityEntry<Record> previousRecord = null;
                for(int rowIndex = 2; rowIndex <= MAX_ROW; rowIndex++)
                {
                    var startDay = Convert.ToDateTime(checkContent(_worksheet.Cells[rowIndex, 2].Value));
                    var lat = checkContent(_worksheet.Cells[rowIndex, 7].Value);
                    var longitude = checkContent(_worksheet.Cells[rowIndex, 8].Value);
                    var siteName =  checkContent(_worksheet.Cells[rowIndex, 1].Value);
                    var habitat1 =  checkContent(_worksheet.Cells[rowIndex, 9].Value);
                    var habitat2 =  checkContent(_worksheet.Cells[rowIndex, 10].Value);
                    var box = checkContent(_worksheet.Cells[rowIndex, 11].Value);

                    var op = checkContent(_worksheet.Cells[rowIndex, 12].Value);
                    
                    var project = checkContent(_worksheet.Cells[rowIndex, 13].Value);

                    var recordStart = Convert.ToDateTime(checkContent(_worksheet.Cells[rowIndex, 14].Value));
                    var recordEnd = Convert.ToDateTime(checkContent(_worksheet.Cells[rowIndex, 15].Value));

                    var speciesId = checkContent(_worksheet.Cells[rowIndex, 3].Value);
                    var pos_min = checkContent(_worksheet.Cells[rowIndex, 4].Value);
                    var nb_contact = checkContent(_worksheet.Cells[rowIndex, 6].Value);
                    var validation = checkContent(_worksheet.Cells[rowIndex, 5].Value);

                    Box boxDb = _context.Boxes.Where(b => b .Name.Equals(box)).FirstOrDefault();
                    if(box != null && boxDb is null)
                    {
                        _context.Boxes.Add(new Box{Name = box});
                        await _context.SaveChangesAsync();
                    }

                    if(!previousBox.Equals(box))
                    {
                        //if project doesn't exist 
                        if(_context.Projects.Where(p => p.Name.Equals(project)).FirstOrDefault() is null)
                        {
                            var project_obj = _context.Projects.Add(new Project
                            {
                                Name = project,
                            });
                            await _context.SaveChangesAsync();
                        }  

                        //if operator doesn't exist
                        if(_context.Operators.Where(o => o.Name.Equals(op)).FirstOrDefault() is null)
                        {
                            var operator_obj = _context.Operators.Add(new Operator
                            {
                                Name = op,
                            });
                            await _context.SaveChangesAsync();

                        } 

                        var test = _context.BoxLocations.Add(new BoxLocation
                        {
                            StartDay = startDay,
                            EndDay = startDay,
                            Latitude = lat,
                            Longitude = longitude,
                            SiteName = siteName,
                            Habitat1 = habitat1,
                            Habitat2 = habitat2,
                            OperatorId = _context.Operators.Where(o => o.Name.Equals(op)).FirstOrDefault().Name,
                            Box = _context.Boxes.Where(b => b.Name.Equals(box)).FirstOrDefault(),
                        });
                        await _context.SaveChangesAsync();

                        var record_obj = _context.Records.Add(new Record
                        {
                            StartHour = recordStart,
                            EndHour = recordEnd,
                            BoxLocationId = (int)_context.BoxLocations.Where(bl => bl.Id == test.Entity.Id).FirstOrDefault()?.Id,
                            Project = _context.Projects.Where(p => p.Name.Equals(project)).FirstOrDefault(),
                            RecordUrl = "Unknown",
                        });
                        await _context.SaveChangesAsync();

                        previousRecord = record_obj;
                        previousBox = box;
                    }
                    _context.AcousticDatas.Add(new AcousticData
                    {
                        SpeciesId = speciesId,
                        PositiveMinute = Convert.ToInt32(pos_min),
                        ContactNumbers = Convert.ToInt32(nb_contact),
                        Validation = validation,
                        RecordId = previousRecord.Entity.Id
                    });
                }
                for(int rowIndex = 2; rowIndex <= MAX_ROW; rowIndex++)
                {
                    var startDay = Convert.ToDateTime(checkContent(_worksheet.Cells[rowIndex, 2].Value));
                    var lat = checkContent(_worksheet.Cells[rowIndex, 7].Value);
                    var longitude = checkContent(_worksheet.Cells[rowIndex, 8].Value);
                    var siteName =  checkContent(_worksheet.Cells[rowIndex, 1].Value);
                    var habitat1 =  checkContent(_worksheet.Cells[rowIndex, 9].Value);
                    var habitat2 =  checkContent(_worksheet.Cells[rowIndex, 10].Value);
                    var box = checkContent(_worksheet.Cells[rowIndex, 11].Value);

                    var op = checkContent(_worksheet.Cells[rowIndex, 12].Value);
                    
                    var project = checkContent(_worksheet.Cells[rowIndex, 13].Value);

                    var recordStart = Convert.ToDateTime(checkContent(_worksheet.Cells[rowIndex, 14].Value));
                    var recordEnd = Convert.ToDateTime(checkContent(_worksheet.Cells[rowIndex, 15].Value));

                    var speciesId = checkContent(_worksheet.Cells[rowIndex, 3].Value);
                    var pos_min = checkContent(_worksheet.Cells[rowIndex, 4].Value);
                    var nb_contact = checkContent(_worksheet.Cells[rowIndex, 6].Value);
                    var validation = checkContent(_worksheet.Cells[rowIndex, 5].Value);

                    
                }

            }
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}