import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { AlertComponent } from 'src/app/Shared/alert/alert.component';
import { AuthService, AuthResponse } from '../authService.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  isLoading = false;
  error: string = null;
  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(private router: Router, private authService: AuthService) {}
  @ViewChild('dynamic', { static: true, read: ViewContainerRef })
  viewRef: ViewContainerRef;

  ngOnInit(): void {}
  onSwitchMode() {
    this.router.navigate(['/auth/signIn']);
    
  }
   
  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe()
    }
    if(this.storeSub){
      this.storeSub.unsubscribe()
    }
  }
  handleSubmit(form: NgForm) {
    let authObs: Observable<AuthResponse>;
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.error = null;
    authObs = this.authService.signup(form.value.email, form.value.password);

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
  showErrorAlert(error: string) {
    this.viewRef.clear();
    const componentRef =
      this.viewRef.createComponent<AlertComponent>(AlertComponent);
    componentRef.instance.message = error;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      this.viewRef.clear();
    });
  }
  onHandleClose() {
    this.error = null;
  }
}
