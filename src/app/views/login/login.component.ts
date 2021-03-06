import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../facades/auth.service';
import {LoginForm} from '../../models/login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, public auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.initForms();
  }

  initForms(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const loginForm: LoginForm = this.formGroup.getRawValue();
      this.auth.login(loginForm);
    }
  }
}
