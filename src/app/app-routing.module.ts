import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutCenterComponent } from '@layouts/layout-center/layout-center.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LayoutCenterComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-in'
      },
      {
        path: 'sign-in',
        loadChildren: () => import('@pages/login/sign-in/sign-in.module').then(m => m.SignInModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('@pages/login/sign-up/sign-up.module').then(m => m.SignUpModule)
      }
    ]
  },
  // {
  //   path: 'dash-board',
  //   component: BoardComponent,
  //   children: [
  //     {
  //       path: '', loadChildren: () => import('@pages/dash-board/dash-board.module').then(m => m.DashBoardModule)
  //     },
  //     {
  //       path: ':id', loadChildren:() => import('@pages/dash-board/dash-board-id/dash-board-id.module').then(m => m.DashBoardIdModule)
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
