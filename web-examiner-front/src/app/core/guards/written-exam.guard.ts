import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WrittenExamService } from '../services/written-exam.service';
import { WrittenExamGetRes } from 'src/app/shared/models/written-exam.model';

@Injectable()
export class WrittenExamGuard implements CanActivate {

  constructor(
    private writtenExamService: WrittenExamService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const id = next.params.id;

    if(this.writtenExamService.getWrittenExams.length < 0 || id < 1) {
      return false;
    }

    const wx: WrittenExamGetRes = this.writtenExamService.getWrittenExams.find((wx: WrittenExamGetRes) => wx.exam_num == id);
    if(!wx) {
      return false;
    }

    return true;
  }
  
}
