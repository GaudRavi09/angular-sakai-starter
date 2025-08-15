import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { EmailInput } from '@/components/form/email-input';
import { PasswordInput } from '@/components/form/password-input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
  imports: [EmailInput, RouterModule, ButtonModule, PasswordInput, PasswordModule, InputTextModule, ReactiveFormsModule]
})
export class Login {
  fb = inject(FormBuilder);
  loginForm = this.fb.group({});

  login() {
    console.log('form', this.loginForm.value);
  }
}
