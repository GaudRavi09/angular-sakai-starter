import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { User, UserService } from '@/services/user.service';
import { ToasterService } from '@/services/toaster.service';
import { debounceTime, Subscription, distinctUntilChanged } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnInit, inject, signal, OnDestroy, Component, ViewChild } from '@angular/core';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'user-list',
  styleUrl: './user-list.scss',
  templateUrl: './user-list.html',
  imports: [DatePipe, RouterLink, FormsModule, TableModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule, ReactiveFormsModule]
})
export class UserList implements OnInit, OnDestroy {
  // serives
  userService = inject(UserService);
  toasterService = inject(ToasterService);
  confirmationService = inject(ConfirmationService);

  // input, output and  viewchild
  @ViewChild('dt') dt!: Table;

  // variables
  cols!: Column[];
  loading = signal(false);
  users = signal<User[]>([]);
  private subscription!: Subscription;
  searchControl = new FormControl('');

  ngOnInit(): void {
    this.initializeColumns();
    this.loadUsers();

    // user search subsciption
    this.subscription = this.searchControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((query) => {
      this.searchUser(query || '');
    });
  }

  exportCSV(): void {
    if (this.dt) {
      this.dt.exportCSV();
    }
  }

  deleteUser(user: User): void {
    console.log(user);
    this.confirmationService.confirm({
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      message: `Are you sure you want to delete user "${user.name}"?`,
      accept: async () => {
        try {
          await this.userService.deleteUser(user.id);
          await this.loadUsers();
          this.toasterService.showSuccess('User deleted successfully.');
        } catch (error: any) {
          this.toasterService.showSuccess(error.message);
        }
      }
    });
  }

  private async searchUser(query: string): Promise<void> {
    try {
      this.loading.set(true);
      const users = await this.userService.searchUsers(query);
      this.users.set(users);
    } catch (error: any) {
      this.toasterService.showError(error.message);
    } finally {
      this.loading.set(false);
    }
  }

  private async loadUsers(): Promise<void> {
    try {
      this.loading.set(true);
      this.users.set(await this.userService.getUsers());
    } catch (error: any) {
      this.toasterService.showError(error.message);
    } finally {
      this.loading.set(false);
    }
  }

  private initializeColumns(): void {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'height', header: 'Height (cm)' },
      { field: 'dob', header: 'DOB' }
    ];
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
