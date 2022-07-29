import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import { test } from '@shared/decorator/test';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';


@AutoUnsubscribe()
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public subscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  public onSignIn(state: NgForm): void {
    const { email, password } = state.value;

    this.subscription = this.authService.signIn(email, password)
      .subscribe(result => {
        this.router.navigate(['dash-board']).then();
      });
  }
}
