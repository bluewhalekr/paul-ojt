import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashBoardComponent } from '@pages/dash-board/dash-board.component';



@NgModule({
  declarations: [
    DashBoardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DashBoardComponent }]),
  ]
})
export class DashBoardModule { }
