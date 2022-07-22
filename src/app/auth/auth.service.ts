import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { catchError, defer, Observable, of, tap } from 'rxjs';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      console.log('auth user', user)
    })
  }

  signIn(email: string, password: string): Observable<UserCredential> {
    return defer(() => this.afAuth.signInWithEmailAndPassword(email, password))

  }

  signUp<T>(email: string, password: string): Observable<UserCredential> {
    return defer(() => this.afAuth.createUserWithEmailAndPassword(email, password))
      .pipe(
        tap((result) => {
          console.log('vvv', result)
        })
      )
  }

  signOut() {
    return this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['sign-in'])
      })
  }
}
