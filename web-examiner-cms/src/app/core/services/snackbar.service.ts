import { Injectable, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  public errorMessage: string = '';
  private snackBarDuration = 2000;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  displayError = (err) => {
    console.error(err);
    this.errorMessage = err.error.message;
    this.snackBar.openFromComponent(ErrorSnackBarComponent, {
      duration: this.snackBarDuration
    });
    if (this.errorMessage === 'Auth failed') {
      this.router.navigate(['/admin/login']);
    }
  }
}

@Component({
  selector: 'error-snackbar',
  template: `<div>
                {{ errorMessage }}
            </div>`,
  styles: [`
    div {
      text-align: center;
      color: pink;
      font-style: italic;
      font-size: 16px;
    }
  `],
})
export class ErrorSnackBarComponent implements OnInit {

  errorMessage: string = '';

  constructor(
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.errorMessage = this.snackbarService.errorMessage;
  }
}
