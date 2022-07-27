import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { SignUpService } from '@pages/login/sign-up/providers/sign-up.service';
import { DirectivesModule } from '@shared/directives/directives.module';
import { SignUpComponent } from './sign-up.component';



@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: SignUpComponent
    }]),
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    DirectivesModule
  ],
  providers: [SignUpService]
})
export class SignUpModule { }
