import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    public router: Router
  ) { }

  handleError(err) {
    console.error(err);
  }
}
