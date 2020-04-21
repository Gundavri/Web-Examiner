import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';

@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openConfirmDialog(exam_num?: number): Observable<boolean> {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '220px',
      height: '130px',
      data: exam_num ? exam_num : null
    });
    return confirmDialogRef.afterClosed();
  }
}
