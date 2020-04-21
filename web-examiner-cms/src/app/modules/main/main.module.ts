import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatIconModule,
    SharedModule
  ],
  providers: [
    DialogService
  ]
})
export class MainModule { }
