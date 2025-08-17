import intlTelInput, { Iti } from 'intl-tel-input';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormGroup, Validators, FormBuilder, AbstractControl, ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { input, inject, OnInit, Component, ViewChild, ElementRef, afterNextRender, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mobile-input',
  styleUrl: './mobile-input.scss',
  templateUrl: './mobile-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputIconModule, IconFieldModule, InputTextModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class MobileInput implements OnInit {
  iti!: Iti;
  required = input(true);
  label = input('Mobile Number');
  controlName = input('phone_number');
  @ViewChild('mobileNumberInput', { static: false }) mobileNumberInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private parentContainer: ControlContainer
  ) {
    // initialize intl-tel-input after the view is ready
    afterNextRender(() => this.initializeIntlTelInput());
  }

  get control(): AbstractControl {
    return this.parentFormGroup.get(this.controlName())!;
  }

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  get getErrorMessage(): string | null {
    const errors = this.control?.errors;

    if (errors?.['required']) {
      return '*Please enter your mobile number.';
    } else if (!this.iti?.isValidNumber()) {
      return '*Please enter a valid mobile number.';
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    const validators = [];
    if (this.required()) {
      validators.push(Validators.required);
    }

    this.parentFormGroup.addControl(this.controlName(), this.fb.control('', validators));
  }

  private initializeIntlTelInput(): void {
    if (this.mobileNumberInput) {
      const mobileNumberInput = this.mobileNumberInput.nativeElement;
      this.iti = intlTelInput(mobileNumberInput, {
        initialCountry: 'in',
        separateDialCode: true,
        countryOrder: ['in', 'us'],
        loadUtils: () => import('node_modules/intl-tel-input/build/js/utils.js')
      });

      // wait for iti to be fully initialized
      this.iti.promise.then(() => {
        // if form already has a value (patchValue was called earlier), set it now
        this.iti.setNumber(this.control?.value);

        // keep iti in sync with form control
        const subscription = this.control.valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe((val) => {
          this.iti.setNumber(val);
          subscription.unsubscribe();
        });

        // handle country change and trigger validation
        mobileNumberInput.addEventListener('countrychange', () => {
          this.control?.updateValueAndValidity();
        });
      });
    }
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    if (!/\d/.test(event.key)) {
      event.preventDefault();
    }
  }

  getPhoneNumber(): string {
    return this.iti?.getNumber();
  }
}
