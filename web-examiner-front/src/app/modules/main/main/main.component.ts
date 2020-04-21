import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ExamService } from 'src/app/core/services/exam.service';
import { ExamRes } from 'src/app/shared/models/exam.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  
}
