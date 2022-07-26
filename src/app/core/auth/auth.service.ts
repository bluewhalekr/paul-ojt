import { Injectable } from '@angular/core';
import { deleteUser, getAuth, updateEmail, updateProfile } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection, AngularFirestoreDocument,
  DocumentData,
  QuerySnapshot
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import firebase from 'firebase/compat';
import { catchError, defer, find, Observable, of, Subject, Subscription, switchMap, tap } from 'rxjs';
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
  private test:  AngularFirestoreDocument<unknown>

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      console.log('auth user', user)
      console.log('2', getAuth())
    })

    this.usersDB = this.afStore.collection('users')
    console.log('iiii', this.getUser)
    this.usersWatch = this.usersDB.valueChanges()
    this.test = this.afStore.doc('users')
  }

  public get ggg(): Observable<Iuser> {
    return this.afStore.collection<Iuser>('users', (ref) => ref.where('uid', '==', this.getUser.uid)).valueChanges().pipe(
      map(x => x[0])
    )
  }
  public get getUser(): UserInfo {
    return getAuth().currentUser!
  }

  public get getRole() {
    return this.usersDB.get()
  }

  public signIn(email: string, password: string): Observable<UserCredential> {
    return defer(() => this.afAuth.signInWithEmailAndPassword(email, password))
  }

  public signUp({ role, email, password } : IreqUser): Observable<firebase.firestore.DocumentReference<DocumentData>> {
    return defer(() => this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap(({ user }) => defer(() => {
        console.log('@@', user)
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
        this.router.navigate(['login','sign-in'])
      })
  }

  public deleteUser() {
    return defer(() => deleteUser(getAuth().currentUser!)).pipe(
      tap((r) => {
        console.log('delete user', r)
      })
    )
  }
}
