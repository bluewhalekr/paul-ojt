import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LayoutCenterComponent } from '@layouts/layout-center/layout-center.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './components/test/test.component';
import { DddComponent } from './components/ddd/ddd.component';
import { TtttPipe } from './pipes/tttt.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LayoutCenterComponent,
    TestComponent,
    DddComponent,
    TtttPipe,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
