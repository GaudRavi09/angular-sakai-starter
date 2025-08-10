import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { input, OnInit, inject, Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ControlContainer, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'email-input',
  styleUrl: './email-input.scss',
  templateUrl: './email-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputIcon, IconField, InputTextModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class EmailInput implements OnInit {
  default = input('');
  required = input(true);
  label = input('Email');
  showIcon = input(false);
  readonly = input(false);
  controlName = input('email');
  placeholder = input('email@example.com');

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

  get getPlaceholder(): string {
    return this.placeholder() || `Enter ${this.label().toLowerCase()}`;
  }

  get isControlInvalid(): boolean {
    return !this.control?.valid && this.control?.touched && this.required();
  }

  ngOnInit(): void {
    const validators = [];
    if (this.required()) {
      validators.push(Validators.required);
    }
    validators.push(Validators.email);

    this.parentFormGroup.addControl(this.controlName(), this.fb.control(this.default(), validators));
  }

  preventSpace(event: KeyboardEvent): void {
    // prevent spaces in the password input
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  formatEmailInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // remove all spaces and convert to lowercase
    input.value = input.value.replace(/\s+/g, '').toLowerCase();
  }
}
