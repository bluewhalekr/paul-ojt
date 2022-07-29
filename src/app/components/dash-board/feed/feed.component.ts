import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@core/auth/auth.model';
import { AuthService } from '@core/auth/auth.service';
import { IResBoard } from '@pages/dash-board/providers/dash-board.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('item') public item!: IResBoard;

  constructor(public authService: AuthService) { }
}
