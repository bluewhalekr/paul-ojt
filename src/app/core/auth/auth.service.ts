import { Injectable } from '@angular/core';
import { deleteUser, getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import firebase from 'firebase/compat';
import { catchError, defer, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { IReqUser, IUser } from './auth.model';
import UserCredential = firebase.auth.UserCredential;
import { format } from 'date-fns';

@AutoUnsubscribe()
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersDB!: AngularFirestoreCollection;
  private usersWatch!: Observable<DocumentData[]>;

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      console.log('auth user', user);
    });

    this.usersDB = this.afStore.collection('users');
    this.usersWatch = this.usersDB.valueChanges();
  }

  public get user$(): Observable<IUser> {
    return this.afStore.collection<IUser>('users', (ref) => ref.where('uid', '==', this.getUser.uid)).valueChanges().pipe(
      map(x => x[0])
    );
  }
  public get getUser(): firebase.User {
    return getAuth().currentUser as firebase.User;
  }

  public signIn(email: string, password: string): Observable<UserCredential> {
    return defer(() => this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      catchError(e => throwError(e))
    );
  }

  public signUp({ role, email, password }: IReqUser): Observable<firebase.firestore.DocumentReference<DocumentData>> {
    return defer(() => this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      catchError(e => throwError(e)),
      switchMap(({ user }) => defer(() => {

        return this.usersDB.add({
          role,
          uid: user?.uid,
          email: user?.email,
          createAt: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
          useActivate: true
        });
      }))
    );
  }

  public signOut(): Observable<boolean> {
    return defer(() => this.afAuth.signOut()).pipe(
      switchMap(() => this.router.navigate(['login', 'sign-in']))
    );
  }

  public deleteUser(): Observable<unknown> {
    return defer(() => deleteUser(this.getUser)).pipe(
      tap(() => {
        defer(() => this.usersDB.ref.where('uid', '==', this.getUser.uid).get()).pipe(
          tap(qSnapshot => {
            qSnapshot.forEach(doc => {
              doc.ref.update({ useActivate: false }).then();
            });
          })
        );
      }),
      switchMap(() => this.router.navigate(['login', 'sign-in']))
    );
  }
}
