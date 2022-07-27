import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { ERols } from '@pages/login/model/login.model';


@AutoUnsubscribe()
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public fg?: FormGroup;
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
    // tslint:disable-next-line:no-non-null-assertion
    const { confirmPassword, password } = this.fg!.getRawValue();

    if (confirmPassword === password) {
      // tslint:disable-next-line:no-non-null-assertion
      this.subscription = this.authService.signUp(this.fg!.getRawValue())
        .subscribe(result => {
          this.router.navigate(['dash-board']).then();
        });
    } else {
      window.alert('비번 확인이 다릅니다');
    }
  }
}
