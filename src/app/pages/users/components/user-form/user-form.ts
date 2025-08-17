import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '@/services/user.service';
import { DateInput } from '@/components/form/date-input';
import { TextInput } from '@/components/form/text-input';
import { EmailInput } from '@/components/form/email-input';
import { ToasterService } from '@/services/toaster.service';
import { MobileInput } from '@/components/form/mobile-input';
import { NumberInput } from '@/components/form/number-input';
import { PasswordInput } from '@/components/form/password-input';
import { input, OnInit, inject, signal, Component, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  styleUrl: './user-form.scss',
  templateUrl: './user-form.html',
  imports: [TextInput, DateInput, RouterLink, EmailInput, MobileInput, NumberInput, FormsModule, ButtonModule, PasswordInput, ReactiveFormsModule]
})
export class UserForm implements OnInit {
  // services
  router = inject(Router);
  fb = inject(FormBuilder);
  userService = inject(UserService);
  toasterService = inject(ToasterService);

  // input, output and  viewchild
  id = input.required<string>();
  @ViewChild(MobileInput) mobileInput!: MobileInput;

  // variables
  loading = signal(false);
  userForm = signal<FormGroup>(this.fb.group({}));

  async ngOnInit(): Promise<void> {
    if (this.id()) {
      try {
        const user = await this.userService.getUserById(this.id());
        this.userForm().patchValue({ ...user });
      } catch (error: any) {
        this.toasterService.showError(error.message);
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (this.userForm().valid) {
      try {
        this.loading.set(true);
        const formData = this.userForm().value;
        formData.phone = this.mobileInput?.getPhoneNumber();

        // update user
        if (this.id()) {
          await this.userService.updateUser(this.id(), formData);
          this.toasterService.showSuccess('User updated successfully.');
        }
        // add user
        else {
          await this.userService.createUser(formData);
          this.toasterService.showSuccess('User saved successfully.');
        }
        this.router.navigate(['/users']);
      } catch (error: any) {
        this.toasterService.showError(error.message);
      } finally {
        this.loading.set(false);
      }
    } else {
      this.userForm().markAllAsTouched();
    }
  }
}
