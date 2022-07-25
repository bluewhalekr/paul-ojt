import { Injectable } from '@angular/core';
import { deleteUser, getAuth, updateEmail, updateProfile } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, ChildEvent } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ERols } from '@pages/login/model/login.model';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import firebase from 'firebase/compat';
import { catchError, defer, Observable, of, Subscription, tap } from 'rxjs';
import { Iuser } from './auth.model';
import UserCredential = firebase.auth.UserCredential;

@AutoUnsubscribe()
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rolesDB!: AngularFirestoreCollection
  private rolesWatch!: Subscription

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      console.log('auth user', user)
      console.log('2', getAuth())
    })


    this.rolesDB = this.afStore.collection('roles')
    this.rolesWatch = this.rolesDB.valueChanges().subscribe((v) => {
      console.log('www', v)
    })
  }

  public signIn(email: string, password: string): Observable<UserCredential> {
    return defer(() => this.afAuth.signInWithEmailAndPassword(email, password))
  }

  public signUp({ role, email, password } : Iuser): Observable<UserCredential> {
    return defer(() => this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      tap(({ user }) => {
        this.afStore.collection('roles').add({ role, uid: user!.uid }).then((result) => {
          console.log('sign up afstore', result)
        })
      })
    )
  }

  public signOut() {
    return this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['sign-in'])
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
