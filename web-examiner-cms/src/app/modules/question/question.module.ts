import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions/questions.component';
import { Routes, RouterModule } from '@angular/router';
import { DialogService } from 'src/app/core/services/dialog.service';
import { QuestionService } from 'src/app/core/services/question.service';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ExamQuestionsComponent } from './exam-questions/exam-questions.component';
import { AnswerService } from 'src/app/core/services/answer.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: QuestionsComponent },
  { path: ':id', component: ExamQuestionsComponent}
];

@NgModule({
  declarations: [QuestionsComponent, ExamQuestionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    FormsModule
  ],
  providers: [
    DialogService,
    QuestionService,
    AnswerService
  ]
})
export class QuestionModule { }
