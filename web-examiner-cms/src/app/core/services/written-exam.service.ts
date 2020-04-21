import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WrittenExamGetRes } from 'src/app/shared/models/written-exam';

@Injectable()
export class WrittenExamService {

  private urlSuffix = '/writtenexam';

  constructor(
    private httpClient: HttpClient
  ) { }

  writtenExamsGet$(): Observable<WrittenExamGetRes[]> {
    return this.httpClient.get<WrittenExamGetRes[]>(this.urlSuffix);
  }

  writtenExamDelete$(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.urlSuffix + '/' + id);
  }

}
