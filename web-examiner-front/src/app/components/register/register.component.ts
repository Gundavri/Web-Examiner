import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { RegisterRes } from 'src/app/shared/models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  errMsg: string = '';

  // Subscriptions
  registerSubmitSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.logout();
    this.initializeRegisterForm();
  }

  initializeRegisterForm() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(63)]),
      username: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(63)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(63)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(63)])
    });
  }

  onRegisterFormSubmit() {
    this.registerSubmitSub = this.authService.register$(this.registerForm.value).subscribe((res: RegisterRes) => {
      this.router.navigate(['/login']);
    }, (err) => {
      this.errMsg = err.error.message;
      console.error(err);
    });
  }

  ngOnDestroy() {
    if(this.registerSubmitSub) this.registerSubmitSub.unsubscribe();
  }
}
