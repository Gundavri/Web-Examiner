import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WrittenExamGetRes } from 'src/app/shared/models/written-exam.model';
import { SubmitExam } from 'src/app/shared/models/exam.model';

@Injectable()
export class WrittenExamService {

  private writtenExams: WrittenExamGetRes[] = [];
  private urlSuffix: string = '/writtenexam';

  constructor(
    private httpClient: HttpClient
  ) { }

  getWrittenExams$(): Observable<WrittenExamGetRes[]> {
    return this.httpClient.get<WrittenExamGetRes[]>(this.urlSuffix);
  }

  submitExam(examToSubmit: SubmitExam): Observable<WrittenExamGetRes> {
    return this.httpClient.post<WrittenExamGetRes>(this.urlSuffix, { writtenExam: examToSubmit});
  }

  get getWrittenExams(): WrittenExamGetRes[] {
    return this.writtenExams;
  }

  setWrittenExams(writtenExams: WrittenExamGetRes[]) {
    this.writtenExams = writtenExams;
  }
}
