import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { BORDER_TYPE, IResBoard } from '@pages/dash-board/providers/dash-board.model';
import { DashBoardService } from '@pages/dash-board/providers/dash-board.service';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import { Observable, Subscription, switchMap } from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'app-dash-board-id',
  templateUrl: './dash-board-id.component.html',
  styleUrls: ['./dash-board-id.component.scss'],
})
export class DashBoardIdComponent implements OnInit {
  private createBoardSubscription?: Subscription;
  private boardDetailSubscription?: Subscription;
  public fg!: FormGroup;
  public docId = '';
  public type?: BORDER_TYPE;
  public boardDetail$?: Observable<IResBoard>;
  public readonly BORDER_TYPE = BORDER_TYPE;

  constructor(
    private router: Router,
    private authService: AuthService,
    private service: DashBoardService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    const [_, type, docId] = this.router.url.split('/').filter(x => x);
    this.type = type as BORDER_TYPE;
    this.docId = docId;
    this.fg = this.fb.group({
      title: [{ value: '', disabled: this.type === BORDER_TYPE.DETAIL }, Validators.required],
      content: [{ value: '', disabled: this.type === BORDER_TYPE.DETAIL }, Validators.required]
    });

    if (type !== BORDER_TYPE.CREATE) {
      this.boardDetailSubscription = this.service.getBoardDetail(docId)
        .subscribe(result => {
          if (result) {
            this.type = BORDER_TYPE.DETAIL;
            this.fg.get('title')?.disable();
            this.fg.get('content')?.disable();
            this.fg.patchValue(result as IResBoard);
          } else {
            this.service.fetchBoardList();
            this.router.navigate(['dash-board']).then();
          }
        });
    }
  }

  public onCreate(): void {
    this.createBoardSubscription = this.service.createBoard(this.fg.value).pipe(
      switchMap(() => this.router.navigate(['/dash-board']))
    ).subscribe();
  }
  public onModify(): void {
    this.type = BORDER_TYPE.MODIFY;
    this.fg.get('title')?.enable();
    this.fg.get('content')?.enable();
  }
  public onApply(): void {
    this.service.updateBoardDetail(this.docId, this.fg.value);
  }
  public onDelete(): void {
    this.service.deleteBoard(this.docId);
  }
}
