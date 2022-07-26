import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import { Subscription } from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public fg!: FormGroup
  private user!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      email: [{ value: '', disabled: true }],
      role: [{ value: '', disabled: true }],
      createAt: [{ value: '', disabled: true }],
    })

    this.user = this.authService.user
      .subscribe((result) => {
        this.fg.patchValue(result)
      })
  }

  onLogout() {
    this.authService.signOut().then()
  }

  onWithdrawal() {
    if (window.confirm('탈퇴 하시겠습니까.')) {
      this.authService.deleteUser()
        .subscribe((result) => {
          console.log('userinfo delete', result)
        })
    }
  }
}
