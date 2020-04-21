import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { LoginRes } from 'src/app/shared/models/login';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  couldnotAuth: boolean = false;

  // Subscriptions
  loginSubmitSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    // Logout
    this.authService.logout();
    // Initializing LoginForm
    this.initializeLoginForm();
  }


  initializeLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(63)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)])
    });
  }

  onLoginFormSubmit() {
    this.loginSubmitSub = this.authService.login$(this.loginForm.value).subscribe((res: LoginRes) => {
      this.authService.setLoggedIn(true);
      this.authService.setToken(res.token);
      this.router.navigate(['/admin']);
    }, err => {
      this.snackbarService.displayError(err);
      this.couldnotAuth = true;
    });
  }


  ngOnDestroy() {
    if (this.loginSubmitSub) this.loginSubmitSub.unsubscribe();
  }

}
