import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';


@AutoUnsubscribe()
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  service$?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  onSignIn(state: NgForm) {
    const { email, password } = state.value

    this.service$ = this.authService.signIn(email, password)
      .subscribe((result) => {
        console.log('in', result)
        this.router.navigate(['dash-board'])
      })
  }

}
