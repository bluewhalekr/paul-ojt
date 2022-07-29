import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AutoUnsubscribe } from '@shared/decorator/auto-unsubscribe';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@AutoUnsubscribe()
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[inputRegexp]'
})
export class InputRegexpDirective implements OnInit {
  @Input('inputRegexp') public regexp = '';
  private ncSubscription!: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngControl: NgControl
  ) { }

  public ngOnInit(): void {
    // tslint:disable-next-line:no-non-null-assertion
    this.ncSubscription = this.ngControl.valueChanges!.pipe(
      map(x => x.replace(new RegExp(this.regexp), '')),
      distinctUntilChanged()
    ).subscribe(result => {
      console.log('subscribe', result);
    });
  }
}
