import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@AutoUnsubscribe()
@Directive({
  selector: '[inputRegexp]'
})
export class InputRegexpDirective implements OnInit {
  @Input('inputRegexp') regexp: string = '';
  private nc!: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngControl: NgControl
  ) { }

  public ngOnInit() {
    this.nc = this.ngControl.valueChanges!.pipe(
      map(x => x.replace(new RegExp(this.regexp), '')),
      distinctUntilChanged()
    ).subscribe((result) => {
      console.log('subscribe', result)
    })
  }
}
