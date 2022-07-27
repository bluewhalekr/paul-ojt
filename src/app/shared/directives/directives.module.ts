import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRegexpDirective } from '@shared/directives/input-regxp/input-regexp.directive';



@NgModule({
  declarations: [InputRegexpDirective],
  exports: [InputRegexpDirective],
  imports: [
    CommonModule,
  ]
})
export class DirectivesModule { }
