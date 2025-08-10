import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { input, OnInit, inject, Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ControlContainer, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'text-input',
  styleUrl: './text-input.scss',
  templateUrl: './text-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconField, InputIcon, InputTextModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class TextInput implements OnInit {
  label = input('');
  default = input('');
  iconName = input('');
  required = input(true);
  placeholder = input('');
  readonly = input(false);
  controlName = input.required<string>();

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
    const validators = this.required() ? [Validators.required] : [];
    this.parentFormGroup.addControl(this.controlName(), this.fb.control(this.default(), validators));
  }
}
