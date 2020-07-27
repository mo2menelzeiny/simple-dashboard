import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {LoginComponent} from './login.component';
import {AuthService} from '../../facades/auth.service';
import {LoginForm} from '../../models/login-form';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mockAuth = jasmine.createSpyObj('AuthService', ['login', 'hasFailed$']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule],
      declarations: [LoginComponent],
      providers: [{provide: AuthService, useValue: mockAuth}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login on submit button click', () => {
    const loginForm: LoginForm = {email: 'test@test.com', password: 'test'};
    component.formGroup.setValue(loginForm);
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(mockAuth.login.calls.count()).toEqual(1);
    expect(mockAuth.login.calls.first().args[0]).toEqual(loginForm);
  });
});
