import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { LoginRes } from 'src/app/shared/models/login.model';
import { ExamService } from 'src/app/core/services/exam.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errMsg: string = '';

  // Subscriptions
  loginSubmitSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private examService: ExamService
  ) { }

  ngOnInit() {
    this.authService.logout();
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = new FormGroup({
      username_email: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(63)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)])
    });
  }

  onLoginFormSubmit() {
    this.loginSubmitSub = this.authService.login$(this.loginForm.value).subscribe((res: LoginRes) => {
      const adminAuth = localStorage.getItem(this.authService.adminAuthTokeStorageKey);
      localStorage.clear();
      if(adminAuth) localStorage.setItem(this.authService.adminAuthTokeStorageKey, adminAuth);
      this.authService.setToken(res.token);
      this.authService.setEmail(res.email);
      this.authService.setLoggedIn(true);
      this.router.navigate(['/']);
    }, (err) => {
      this.errMsg = err.error.message;
      console.error(err);
    });
  }

  ngOnDestroy() {
    if (this.loginSubmitSub) this.loginSubmitSub.unsubscribe();
  }
}
