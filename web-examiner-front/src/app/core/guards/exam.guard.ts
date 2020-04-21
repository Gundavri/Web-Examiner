import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ExamService } from '../services/exam.service';
import { ExamRes } from 'src/app/shared/models/exam.model';

@Injectable()
export class ExamGuard implements CanActivate {

  constructor(
    private examService: ExamService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const id = next.params.id;
      if(!this.examService.getExams || id < 1){
        this.router.navigate(['/landing']);
        return false;
      }
      const exam: ExamRes = this.examService.getExams.find((e: ExamRes) => e.exam_num == id);
      if(!exam || !exam.is_active) {
        this.router.navigate(['/landing']);
        return false
      }
      return true;
  }
  
}
