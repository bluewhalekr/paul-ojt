import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FeedComponent } from '@components/dash-board/feed/feed.component';
import { DashBoardIdComponent } from '@pages/dash-board/dash-board-id/dash-board-id.component';
import { DashBoardComponent } from '@pages/dash-board/dash-board.component';
import { DashBoardService } from '@pages/dash-board/providers/dash-board.service';
import { DashBoardStore } from '@pages/dash-board/providers/dash-board.store';
import { SignInComponent } from '@pages/login/sign-in/sign-in.component';



@NgModule({
  declarations: [
    DashBoardComponent,
    DashBoardIdComponent,
    FeedComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    RouterModule.forChild([
      { path: '', component: DashBoardComponent },
      { path: 'create', component: DashBoardIdComponent },
      { path: 'detail/:id', component: DashBoardIdComponent },
    ]),
  ],
  providers: [
    DashBoardService,
    DashBoardStore
  ]
})
export class DashBoardModule { }
