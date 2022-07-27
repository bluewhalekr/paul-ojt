import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '@shared/directives/directives.module';
import { SignInComponent } from './sign-in.component';



@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{
      path: '',
      component: SignInComponent
    }]),
    MatButtonModule,
    MatInputModule,
    DirectivesModule
  ]
})
export class SignInModule { }
