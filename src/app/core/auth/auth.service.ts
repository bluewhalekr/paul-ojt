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
import { defer, Observable, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { IreqUser, Iuser } from './auth.model';
import UserCredential = firebase.auth.UserCredential;
import UserInfo = firebase.UserInfo;
import { format } from 'date-fns'

@AutoUnsubscribe()
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersDB!: AngularFirestoreCollection;
  private usersWatch!:Observable<DocumentData[]>;

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    private router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      console.log('auth user', user)
    })

    this.usersDB = this.afStore.collection('users')
    this.usersWatch = this.usersDB.valueChanges()
  }

  public get user(): Observable<Iuser> {
    return this.afStore.collection<Iuser>('users', (ref) => ref.where('uid', '==', this.getUser.uid)).valueChanges().pipe(
      map(x => x[0])
    )
  }
  public get getUser(): UserInfo {
    return getAuth().currentUser!
  }

  public signIn(email: string, password: string): Observable<UserCredential> {
    return defer(() => this.afAuth.signInWithEmailAndPassword(email, password))
  }

  public signUp({ role, email, password } : IreqUser): Observable<firebase.firestore.DocumentReference<DocumentData>> {
    return defer(() => this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap(({ user }) => defer(() => {

        return this.usersDB.add({
          role,
          uid: user!.uid,
          email: user!.email,
          createAt: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
          useActivate: true
        })
      }))
    )
  }

  public signOut() {
    return this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['login','sign-in']).then()
      })
  }

  public deleteUser() {
    const uid = this.getUser.uid
    return defer(() => deleteUser(getAuth().currentUser!)).pipe(
      tap((r) => {
        this.usersDB.ref.where('uid', '==', uid).get()
          .then((qSnapshot) => {
            qSnapshot.forEach((doc) => {
              console.log(doc.id, doc.data())
              doc.ref.update({ useActivate: false })
            })
          })
        this.router.navigate(['login','sign-in']).then()
      })
    )
  }
}
