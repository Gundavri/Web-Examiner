import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExamGetRes, ExamDeleteRes, ExamPostReq, ExamPutReq, ExamPutRes } from 'src/app/shared/models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private urlSuffix = '/exam';
  public exams: ExamGetRes[] =[];

  constructor(
    private httpClient: HttpClient
  ) { }

  examsGet$(): Observable<ExamGetRes[]> {
    return this.httpClient.get<ExamGetRes[]>(this.urlSuffix);
  }

  examDelete$(id: string): Observable<ExamDeleteRes> {
    return this.httpClient.delete<ExamDeleteRes>(this.urlSuffix + '/' + id);
  }

  examPost$(examPostReq: ExamPostReq): Observable<ExamGetRes> {
    return this.httpClient.post<ExamGetRes>(this.urlSuffix, examPostReq);
  }

  examPut$(id: string, examPutReq: ExamPutReq): Observable<ExamPutRes> {
    return this.httpClient.put<ExamPutRes>(this.urlSuffix + '/' + id, examPutReq);
  }
}
