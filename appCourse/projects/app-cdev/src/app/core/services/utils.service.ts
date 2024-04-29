import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

import { IMetadata } from '../../shared/components/table/table.component';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { ExportComponent } from '../components/export/export.component';

export type TYPE_EXPORT_PDF = 'view' | 'download' | 'print';

declare var require: any;

//const pdfMake = require('pdfmake/build/pdfmake.js');
//const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class UtilsService {
  constructor(
    private dialog: MatDialog,
    private notification: MatSnackBar,
    private bottom: MatBottomSheet
  ) {}

  openModal(component: any, options: { [k: string]: any }): MatDialogRef<any> {
    return this.dialog.open(component, options);
  }

  showMessage(message: string) {
    this.notification.open(message, null, {
      duration: 3000,
    });
  }

  confirm(message: string = ''): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      panelClass: 'modal-confirm',
      disableClose: true,
    });

    if (message) dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

  exportData(
    data: any,
    metadata: IMetadata[],
    filename: string,
    title: string
  ) {
    const reference = this.bottom.open(ExportComponent, {
      data: { data, metadata, filename, title },
    });

    return reference.afterDismissed();
  }

  exportToExcel(
    data: any,
    metadata: IMetadata[],
    filename: string,
    sheetname: string
  ) {
    const dataToExport = this.fromDataToExport(data, metadata);
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, sheetname);
    XLSX.writeFile(workBook, `${filename}.xlsx`);
  }

  fromDataToExport(data: any, metadata: IMetadata[]) {
    return data.map((item: any) => {
      const newRow: Record<string, any> = {};
      for (const prop in item) {
        const md = metadata.find((m: IMetadata) => m.field === prop);
        if (md) newRow[md.field] = item[prop];
      }

      return newRow;
    });
  }

  async fromFileToDataUrl(path: string) {
    const response = await fetch(path);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async exportToPDF(
    data: any,
    metadata: IMetadata[],
    filename: string,
    title: string,
    type: TYPE_EXPORT_PDF
  ) {
    const dataToExport = this.fromDataToExport(data, metadata);

    const imageLogo = await this.fromFileToDataUrl(
      'assets/logos/logo-cursos.png'
    );

    const infoFormatted: any = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [20, 20, 20, 20],
      content: [
        this.generateHeader(title, imageLogo),
        this.generateContent(dataToExport),
      ],
      styles: this.generateStyles(),
      footer: this.generateHeaderFooter,
    };

    this.generatePDF(infoFormatted, filename, type);
  }

  generateHeader(title: string, imageLogo: any) {
    return {
      margin: [0, 0, 0, 20],
      table: {
        widths: [120, 'auto', 100, 'auto'],
        body: [
          [
            {
              image: imageLogo,
              width: 100,
              border: [false, false, true, false],
              borderColor: ['#000', '#000', '#000', '#000'],
              borderWidth: 1,
            },
            {
              text: [
                this.generateRow('CursosDev', 'headerLeft'),
                this.generateRow('Av. De los Alipios 234', 'subHeaderLeft'),
                this.generateRow('San Isidro. Lima - Perú', 'subHeaderLeft'),
                this.generateRow('Teléfono: (51-1) 24455455', 'subHeaderLeft'),
                this.generateRow('info@cursos-dev.com', 'subHeaderLeft'),
                this.generateRow('www.cursos-dev.com', 'subHeaderLeft'),
              ],
              border: [false, false, false, false],
            },
            {
              border: [false, false, false, false],
              text: '',
            },
            {
              border: [false, false, false, false],
              text: title,
              style: 'titleReport',
            },
          ],
        ],
      },
    };
  }

  generateRow(text: string, style: string) {
    const row: { text: string; style?: string } = { text: `${text}\n` };
    if (style) row.style = style;

    return row;
  }

  generateContent(data: any) {
    const body = data.map((el: any) =>
      Object.keys(el).map((prop) => this.generateRowData(el[prop]))
    );
    const rowHeaders: any = Object.keys(data[0]).map((prop) => [
      {
        border: [false, false, false, false],
        text: prop,
        style: 'header',
      },
    ]);

    const quantityColumns = rowHeaders.length;

    const widths = Array.from(Array(quantityColumns).keys()).map(
      () => Math.floor(100 / quantityColumns) + '%'
    );

    body.unshift(rowHeaders);

    return {
      margin: [0, 0, 0, 0],
      table: {
        widths,
        body,
      },
    };
  }

  generateRowData(value: string) {
    return {
      text: value,
      border: [false, false, false, false],
    };
  }

  generatePDF(infoFormatted: any, filename: string, option: TYPE_EXPORT_PDF) {
    const documentGenerated = pdfMake.createPdf(infoFormatted);
    switch (option) {
      case 'view':
        documentGenerated.open();
        break;
      case 'download':
        documentGenerated.download(filename);
        break;
      case 'print':
        documentGenerated.print();
        break;
    }
  }

  generateStyles() {
    return {
      headerLeft: {
        fontFamily: 'Verdana',
        fontSize: 13,
        height: 16,
        color: '#3c3b40',
      },
      subHeaderLeft: {
        fontFamily: 'Verdana',
        fontSize: 10,
        height: 16,
        color: '#3c3b40',
      },
      titleReport: {
        fontFamily: 'Verdana',
        fontSize: 15,
        height: 16,
        color: '#3c3b40',
      },
      header: {
        fontFamily: 'Verdana',
        fontSize: 13,
        height: 14,
        color: '#3c3b40',
        bold: true,
      },
    };
  }

  generateHeaderFooter(currentPage: number, pageCount: number) {
    return [
      { text: `Página ${currentPage} de ${pageCount}`, alignment: 'center' },
    ];
  }
}
