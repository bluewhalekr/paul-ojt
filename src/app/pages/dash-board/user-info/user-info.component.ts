import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import { forkJoin, Subscription } from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public fg!: FormGroup;
  private userSubscription!: Subscription;
  private serviceSignoutSubscription!: Subscription;
  private serviceDeleteUserSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      email: [{ value: '', disabled: true }],
      role: [{ value: '', disabled: true }],
      createAt: [{ value: '', disabled: true }],
    });

    this.userSubscription = this.authService.user$
      .subscribe(result => {
        this.fg.patchValue(result);
      });
  }

  public onLogout(): void {
    this.serviceSignoutSubscription = this.authService.signOut().subscribe();
  }

  public onWithdrawal(): void {
    if (window.confirm('탈퇴 하시겠습니까.')) {
      this.serviceDeleteUserSubscription = this.authService.deleteUser().subscribe();
    }
  }
}
