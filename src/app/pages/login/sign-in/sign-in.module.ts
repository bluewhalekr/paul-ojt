import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in.component';



@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: SignInComponent
    }]),
    MatButtonModule,
    MatInputModule,
  ]
})
export class SignInModule {
  constructor() {
    console.log('?????? sign in module')
  }
}
