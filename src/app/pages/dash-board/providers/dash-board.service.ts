import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '@core/auth/auth.service';
import { IReqCreateBoard, IResBoard } from '@pages/dash-board/providers/dash-board.model';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import { format } from 'date-fns';
import firebase from 'firebase/compat';
import { BehaviorSubject, defer, Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
import DocumentReference = firebase.firestore.DocumentReference;


@AutoUnsubscribe()
@Injectable()
export class DashBoardService {
  public dashBoardDB!: AngularFirestoreCollection<IResBoard>;
  public boardDetail$!: Observable<IResBoard | undefined>;
  public readonly boardList$: BehaviorSubject<IResBoard[]> = new BehaviorSubject<IResBoard[]>([]);
  private httpSubscription?: Subscription;

  constructor(
    private http: HttpClient,
    private readonly afStore: AngularFirestore,
    private authService: AuthService
  ) {
    this.dashBoardDB = this.afStore.collection('dash-board');
  }

  public fetchBoardList(): void {
    this.httpSubscription = this.http.get<IResBoard[]>('dash-board').subscribe(result => {
      this.boardList$.next(result);
    });
  }
  public get boardList(): Observable<IResBoard[]> {
    return this.boardList$.asObservable();
  }

  // fixme 1 : n 구독형태로 구조변경
  public getBoardDetail(docId: string): Observable<IResBoard> {
    // @ts-ignore
    return this.dashBoardDB.doc<IResBoard>(docId).valueChanges();
  }

  public updateBoardDetail(id: string, condition: any): void {
    this.dashBoardDB.doc(id).update(condition).then();
  }

  public createBoard({ title, content }: IReqCreateBoard): Observable<DocumentReference<firebase.firestore.DocumentData>> {
    return defer(() => this.dashBoardDB.add({
      id: this.afStore.createId(),
      title,
      content,
      createAt: new Date().toISOString(),
      email: this.authService.getUser.email,
    })).pipe(
      switchMap(result => this.dashBoardDB.doc(result.id).collection('comment').add({})),
    );
  }

  public deleteBoard(id: string): void {
    this.dashBoardDB.doc(id).delete().then();
  }
}
