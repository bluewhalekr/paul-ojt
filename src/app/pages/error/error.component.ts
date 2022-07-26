import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  constructor(
    private router: Router
  ) { }

  onLink() {
    this.router.navigate(['login', 'sign-in']).then()
  }
}
