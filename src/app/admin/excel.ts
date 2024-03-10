import { excelType } from "./contant";
import * as ExcelProper from "exceljs";
import * as Excel from "exceljs/dist/exceljs.min.js";

import * as FileSaver from "file-saver";
export const exportExcelFileExcel = (
    title: string,
    fileName: string,
    listHeader: string[],
    type: excelType,
    listData:any,
    dataCate:any|null
  ) => {
    //Create workbook and worksheet
    let workbook: ExcelProper.Workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("Sheet 1");
    listHeader.forEach((element, index) => {
      if (index == 0) {
        worksheet.getColumn(index + 1).width = 10;
      } else {
        worksheet.getColumn(index + 1).width = 25;
      }
    });
  
    let titleRow = worksheet.addRow([]);
    switch (type) {
      case excelType.Category:
        worksheet.mergeCells("A2:C2");
        break;
        case excelType.Product:
        worksheet.mergeCells("A2:G2");
        break;
    }
    worksheet.getCell("A2").font = {
      name: "Calibri",
      family: 4,
      size: 16,
      underline: "none",
      bold: true,
    };
    worksheet.getCell("A2").value = title;
    worksheet.getCell("A2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
  
    worksheet.addRow([]);
    let headerRow = worksheet.addRow(listHeader);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell:any, number:any) => {
      if (cell.value !== "") {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "fbc02d" },
          bgColor: { argb: "FFFFFF" },
        };
        cell.font = {
          name: "Calibri",
          family: 4,
          size: 11,
          underline: "none",
          bold: false,
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      }
    });
  
    switch (type) {
      case excelType.Product:
        for (let i = 0; i < listData.length; i++) {
            let category=dataCate.find((item:any)=>item["categoryId"]===listData[i]["categoryId"])
          worksheet.addRow([]);
          worksheet.getCell("A" + (5 + i)).value = i + 1;
          worksheet.getCell("B" + (5 + i)).value = listData[i]["name"]
          worksheet.getCell("C" + (5 + i)).value = listData[i]["sale"]
          worksheet.getCell("D" + (5 + i)).value = listData[i]["price"]
          worksheet.getCell("E" + (5 + i)).value = listData[i]["quantity"]
          worksheet.getCell("F" + (5 + i)).value = category["name"]
          worksheet.getCell("G" + (5 + i)).value = listData[i]["decription"]
        }
        break;
        case excelType.Category:
        for (let i = 0; i < listData.length; i++) {
          worksheet.addRow([]);
          worksheet.getCell("A" + (5 + i)).value = i + 1;
          worksheet.getCell("B" + (5 + i)).value = listData[i]["name"]
        }
        break;
    }
  
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(
        blob,
        fileName + ".xlsx"
      );
    });
  };