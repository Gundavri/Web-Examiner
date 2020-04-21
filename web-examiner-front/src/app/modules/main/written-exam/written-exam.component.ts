import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WrittenExamService } from 'src/app/core/services/written-exam.service';
import { WrittenExamGetRes } from 'src/app/shared/models/written-exam.model';

@Component({
  selector: 'app-written-exam',
  templateUrl: './written-exam.component.html',
  styleUrls: ['./written-exam.component.css']
})
export class WrittenExamComponent implements OnInit {

  score: number;

  constructor(
    private router: Router,
    private writtenExamService: WrittenExamService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.score = this.writtenExamService.getWrittenExams.find((wx: WrittenExamGetRes) => {
      return wx.exam_num == this.route.snapshot.params.id;
    }).score;
  }

  // previous() {
  //   this.currentQuestion--;
  // }

  // next() {
  //   this.currentQuestion++;
  // }

  leave() {
    this.router.navigate(['/landing']);
  }

}
