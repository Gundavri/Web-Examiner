import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { ExamService } from 'src/app/core/services/exam.service';
import { HeaderComponent } from './header/header.component';
import { ExamComponent } from './exam/exam.component';
import { LandingComponent } from './landing/landing.component';
import { ExamGuard } from 'src/app/core/guards/exam.guard';
import { WrittenExamService } from 'src/app/core/services/written-exam.service';
import { WrittenExamComponent } from './written-exam/written-exam.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogService } from 'src/app/core/services/dialog.service';
import { WrittenExamGuard } from 'src/app/core/guards/written-exam.guard';


@NgModule({
  declarations: [MainComponent, HeaderComponent, ExamComponent, LandingComponent, WrittenExamComponent],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ],
  providers: [
    ExamGuard,
    WrittenExamGuard,
    WrittenExamService,
    DialogService
  ]
})
export class MainModule { }
