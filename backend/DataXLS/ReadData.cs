using System;
using System.IO;
using OfficeOpenXml;

namespace backend.DataXLS
{
    public class ReadData
    {
        public static void ReadFile()
        {
            var file = new FileInfo("DataXLS/Données acoustiques_18102018.xlsx");
            using(ExcelPackage excelPackage = new ExcelPackage(file))
            {
                var worksheet = excelPackage.Workbook.Worksheets[1];
                int rowCount = worksheet.Dimension.Rows;
                int columnCount = worksheet.Dimension.Columns;
                for(int rowIndex = 1; rowIndex <= rowCount; rowIndex++)
                {
                    for(int colIndex = 1; colIndex < columnCount; colIndex++)
                    {
                        var value = worksheet.Cells[rowIndex, colIndex].Value is null ? "" : worksheet.Cells[rowIndex, colIndex].Value.ToString();
                        Console.WriteLine("Column {0}, row {1} = {2}", colIndex, rowIndex, value);
                    }
                }
            }
        }
    }
}