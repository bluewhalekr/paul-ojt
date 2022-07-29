import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { range } from '@core/functools';
import { IResBoard } from '@pages/dash-board/providers/dash-board.model';
import { DashBoardService } from '@pages/dash-board/providers/dash-board.service';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import { Subscription } from 'rxjs';

type Closest = (s: string) => HTMLElement | null;

@AutoUnsubscribe()
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit, AfterViewInit {
  private boardListSubscription!: Subscription;
  private routerEvent?: Subscription;
  public list: IResBoard[] = [];
  public isLoading = false;

  constructor(
    private router: Router,
    public service: DashBoardService
  ) {
  }

  public ngOnInit(): void {
    this.service.fetchBoardList();
  }
  public ngAfterViewInit(): void {
    this.routerEvent = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && !this.isLoading) {
        this.isLoading = true;
      } else if (( event instanceof NavigationEnd ) || ( event instanceof NavigationCancel )) {
        this.isLoading = false;
      }
    });
  }
}
