import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-layout-board',
  templateUrl: './layout-board.component.html',
  styleUrls: ['./layout-board.component.scss']
})
export class LayoutBoardComponent implements AfterViewInit {
  @ViewChild('header') header!: ElementRef


  constructor(
    private authService: AuthService,
    private elementRef: ElementRef
  ) { }

  public ngAfterViewInit() {
    this.elementRef.nativeElement.style.setProperty('--hf', `${this.header.nativeElement.offsetHeight}px`)
  }


  onLogout() {
    this.authService.signOut().then()
  }
}
