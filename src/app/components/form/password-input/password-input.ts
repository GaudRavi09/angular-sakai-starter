import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { input, inject, OnInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ControlContainer, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'password-input',
  styleUrl: './password-input.scss',
  templateUrl: './password-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconField, InputIcon, PasswordModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class PasswordInput implements OnInit {
  required = input(true);
  showIcon = input(false);
  label = input('Password');
  controlName = input('password');

  constructor(
    private fb: FormBuilder,
    private parentContainer: ControlContainer
  ) {}

  get control(): AbstractControl {
    return this.parentFormGroup.get(this.controlName())!;
  }

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  get isControlInvalid(): boolean {
    return !this.control?.valid && this.control?.touched && this.required();
  }

  ngOnInit(): void {
    const validators = [];
    if (this.required()) {
      validators.push(Validators.required);
    }
    validators.push(Validators.minLength(8));

    this.parentFormGroup.addControl(this.controlName(), this.fb.control('', validators));
  }

  preventSpace(event: KeyboardEvent): void {
    // prevent spaces in the password input
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  removeSpace(event: Event) {
    const input = event.target as HTMLInputElement;
    // remove all spaces from the input value
    input.value = input.value.replace(/\s+/g, '');
  }
}
