import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

import { TYPE_EXPORT_PDF, UtilsService } from '../../services/utils.service';

@Component({
  selector: 'cdev-export',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './export.component.html',
  styleUrl: './export.component.css',
})
export class ExportComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any,
    private readonly utilsService: UtilsService,
    private readonly reference: MatBottomSheetRef<ExportComponent>
  ) {}

  exportToExcel() {
    this.reference.dismiss();

    const { data, metadata, filename, title } = this.data;
    this.utilsService.exportToExcel(data, metadata, filename, title);
  }

  exportToPDF(type: TYPE_EXPORT_PDF) {
    this.reference.dismiss();

    const { data, metadata, filename, title } = this.data;
    this.utilsService.exportToPDF(data, metadata, filename, title, type);
  }
}
