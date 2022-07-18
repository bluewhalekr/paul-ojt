import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


const FG_STATUS = {
  VALID: 'VALID',
  INVALID: 'INVALID',
  PENDING: 'PENDING',
  DISABLED: 'DISABLED'
} as const

type T_FG_STATUS = keyof typeof FG_STATUS

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  fg?: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      id: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get canSubmit(): boolean {
    return this.fg!.status === FG_STATUS.VALID
  }

  onSignIn() {
  }

}
