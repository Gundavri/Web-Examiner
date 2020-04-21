import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

var dialogList = [
];

var componentsList = [
  dialogList,
  ConfirmDialogComponent
];


@NgModule({
  declarations: [
    componentsList
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    componentsList
  ],
  entryComponents: [
    componentsList
  ]
})
export class SharedModule { }
