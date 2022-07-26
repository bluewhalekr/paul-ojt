import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashBoardComponent } from '@pages/dash-board/dash-board.component';
import { ErrorComponent } from './error.component';



@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ErrorComponent }]),
  ]
})
export class ErrorModule { }
