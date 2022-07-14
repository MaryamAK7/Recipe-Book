import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/Shared/alert/alert.component';
import { AuthResponse, AuthService } from './authService.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  error: string = null;
  isLoading = false;
  private closeSub: Subscription;

  @ViewChild('dynamic', {static:true, read: ViewContainerRef }) viewRef : ViewContainerRef;

  constructor(private authService: AuthService, private router : Router) {}

  ngOnInit(): void {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  handleSubmit(form: NgForm) {
    let authObs: Observable<AuthResponse>;
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.error = null;
    if (this.isLoginMode) {
      authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      authObs = this.authService.signup(form.value.email, form.value.password);
    }

    authObs.subscribe({
      next: (respData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
       this.showErrorAlert(errorMessage);
      },
    });
  }
  onHandleClose(){
    this.error = null;
  }

  showErrorAlert(error:string){
    this.viewRef.clear();
    const componentRef = this.viewRef.createComponent<AlertComponent>(AlertComponent);
    componentRef.instance.message = error;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      this.viewRef.clear();
    })
  }
}
