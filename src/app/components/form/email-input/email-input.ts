import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged } from 'rxjs';
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

    // check validation if there's an value (edit scenario)
    const subscription = this.control.valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe(() => {
      this.checkValidation();
      subscription.unsubscribe();
    });
  }

  checkValidation(): void {
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
  }

  // prevent spaces
  preventSpace(event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  // remove all spaces and convert to lowercase
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\s+/g, '').toLowerCase();
  }
}
