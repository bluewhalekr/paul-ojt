import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth-guard';
import { LayoutBoardComponent } from '@layouts/layout-board/layout-board.component';
import { LayoutCenterComponent } from '@layouts/layout-center/layout-center.component';
import { LayoutErrorComponent } from '@layouts/layout-error/layout-error.component';


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
  {
    path: 'dash-board',
    component: LayoutBoardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('@pages/dash-board/dash-board.module').then(m => m.DashBoardModule) },
      { path: 'user-info', loadChildren: () => import('@pages/dash-board/user-info/user-info.module').then(m => m.UserInfoModule) }
    ]
  },
  {
    path: '**',
    component: LayoutErrorComponent,
    loadChildren: () => import('@pages/error/error.module').then(m => m.ErrorModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
