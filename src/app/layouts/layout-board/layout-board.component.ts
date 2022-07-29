import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import { forkJoin, Subscription, takeUntil } from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'app-layout-board',
  templateUrl: './layout-board.component.html',
  styleUrls: ['./layout-board.component.scss']
})
export class LayoutBoardComponent implements AfterViewInit {
  @ViewChild('header', { static: true }) public header!: ElementRef;
  private serviceSignoutSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef
  ) { }

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.style.setProperty('--hf', `${this.header.nativeElement.offsetHeight}px`);
  }

  public onLogout(): void {
    this.serviceSignoutSubscription = this.authService.signOut().subscribe();
  }
}
