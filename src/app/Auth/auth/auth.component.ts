import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './authService.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  error: string = null;
  isLoading = false;

  constructor(private authService: AuthService) {}



  ngOnInit(): void {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  handleSubmit(form: NgForm) {
    let authObs : Observable<AuthResponse>;
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {
     authObs =  this.authService.login(form.value.email, form.value.password);
    } else {
     authObs =  this.authService.signup(form.value.email, form.value.password);
    }

    authObs.subscribe({
      next: (respData) => {
        this.isLoading = false;
        console.log(respData);
      },
      error: (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
        console.log(errorMessage);
      },
    })

    form.reset();
  }
}
