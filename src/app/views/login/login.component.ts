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
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.formGroup.valid) {
      this.auth.login(this.formGroup.getRawValue() as LoginForm);
    }
  }
}
