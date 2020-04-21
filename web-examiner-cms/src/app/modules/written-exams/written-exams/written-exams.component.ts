import { Component, OnInit, OnDestroy } from '@angular/core';
import { WrittenExamGetRes } from 'src/app/shared/models/written-exam';
import { Subscription } from 'rxjs';
import { WrittenExamService } from 'src/app/core/services/written-exam.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-written-exams',
  templateUrl: './written-exams.component.html',
  styleUrls: ['./written-exams.component.scss']
})
export class WrittenExamsComponent implements OnInit, OnDestroy {

  writtenExams: WrittenExamGetRes[] = [];
  writtenExamsToShow: WrittenExamGetRes[] = [];
  prevSearch: string = '';

  // Subscriptions Arr
  subscriptionsArr: Subscription[] = [];

  constructor(
    private writtenExamService: WrittenExamService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.getWrittenExams();
  }

  getWrittenExams() {
    this.subscriptionsArr.push(
      this.writtenExamService.writtenExamsGet$().subscribe((res: WrittenExamGetRes[]) => {
        this.writtenExams = res;
        this.onSearchChange('');
      })
    );
  }

  onDelete(index: number) {
    this.subscriptionsArr.push(
      this.dialogService.openConfirmDialog().subscribe((res: boolean) => {
        if(res) {
          this.writtenExamService.writtenExamDelete$(this.writtenExamsToShow[index]._id).subscribe((res: any) => {
            this.writtenExams = this.writtenExams.filter((wx: WrittenExamGetRes) => wx._id !== this.writtenExamsToShow[index]._id);
            this.search();
          }, this.snackbarService.displayError);
        }
      })
    );
  }

  search() {
    this.writtenExamsToShow = [...this.writtenExams];
    this.writtenExamsToShow = this.writtenExams.filter((e: WrittenExamGetRes) => {
      return (e.exam_num == Number(this.prevSearch))
               || e.user.username.toLowerCase().includes(this.prevSearch.toLowerCase())
               || e.user.email.toLowerCase().includes(this.prevSearch.toLowerCase());
    });
  }

  onSearchChange(toSearch: string) {
    this.prevSearch = toSearch;
    this.search();
  }

  ngOnDestroy() {
    this.subscriptionsArr.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
