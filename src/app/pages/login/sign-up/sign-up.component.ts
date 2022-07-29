import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import { catchError, distinctUntilChanged, filter, from, of, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { ERols } from '@pages/login/model/login.model';


@AutoUnsubscribe()
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public fg!: FormGroup;
  private subscription?: Subscription;
  public readonly roles: string[] = Object.keys(ERols);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.fg = this.fb.group({
      role: [ERols.CLIENT],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  public onSubmit(): void {
    const { confirmPassword, password } = this.fg.value;
    this.subscription = of({ confirmPassword, password }).pipe(
      tap(result => result.confirmPassword !== result.password && window.alert('비번 확인이 다릅니다')),
      filter(result => result.confirmPassword === result.password),
      switchMap(() => this.authService.signUp(this.fg.getRawValue())),
    ).subscribe(result => {
      console.log(result);
      this.router.navigate(['dash-board']).then()
    });

    // if (confirmPassword === password) {
    //   this.subscription = this.authService.signUp(this.fg.getRawValue())
    //     .subscribe(result => {
    //       this.router.navigate(['dash-board']).then();
    //     });
    // } else {
    //   window.alert('비번 확인이 다릅니다');
    // }
  }
}
