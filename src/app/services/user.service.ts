import { delay } from 'rxjs/operators';
import { firstValueFrom, of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  dob: Date | null;
  password?: string;
  height: number | null;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    {
      id: '1',
      height: 175,
      name: 'John Doe',
      password: '12345678',
      phone: '+12345678901',
      dob: new Date('1990-05-15'),
      email: 'john.doe@example.com',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      height: 162,
      name: 'Jane Smith',
      password: '12345678',
      phone: '+12345678911',
      dob: new Date('1988-08-22'),
      email: 'jane.smith@example.com',
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-16')
    },
    {
      id: '3',
      height: 180,
      password: '12345678',
      name: 'Mike Johnson',
      phone: '+12345678921',
      dob: new Date('1985-12-10'),
      email: 'mike.johnson@example.com',
      createdAt: new Date('2024-01-17'),
      updatedAt: new Date('2024-01-17')
    },
    {
      id: '4',
      height: 168,
      password: '12345678',
      phone: '+12345678931',
      name: 'Sarah Williams',
      dob: new Date('1992-03-20'),
      email: 'sarah.williams@example.com',
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '5',
      height: 182,
      name: 'David Brown',
      password: '12345678',
      phone: '+12345678941',
      dob: new Date('1987-07-14'),
      email: 'david.brown@example.com',
      createdAt: new Date('2024-01-19'),
      updatedAt: new Date('2024-01-19')
    },
    {
      id: '6',
      height: 165,
      name: 'Emily Davis',
      password: '12345678',
      phone: '+12345678951',
      dob: new Date('1995-11-08'),
      email: 'emily.davis@example.com',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '7',
      height: 178,
      password: '12345678',
      phone: '+12345678961',
      name: 'Robert Wilson',
      dob: new Date('1983-04-25'),
      updatedAt: new Date('2024-01-21'),
      createdAt: new Date('2024-01-21'),
      email: 'robert.wilson@example.com'
    },
    {
      id: '8',
      height: 170,
      password: '12345678',
      phone: '+12345678971',
      name: 'Lisa Anderson',
      dob: new Date('1991-09-30'),
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-22'),
      email: 'lisa.anderson@example.com'
    },
    {
      id: '9',
      height: 185,
      password: '12345678',
      phone: '+12345678981',
      name: 'Michael Taylor',
      dob: new Date('1986-02-18'),
      createdAt: new Date('2024-01-23'),
      updatedAt: new Date('2024-01-23'),
      email: 'michael.taylor@example.com'
    },
    {
      id: '10',
      height: 163,
      password: '12345678',
      phone: '+12345678991',
      name: 'Jennifer Martinez',
      dob: new Date('1993-06-12'),
      createdAt: new Date('2024-01-24'),
      updatedAt: new Date('2024-01-24'),
      email: 'jennifer.martinez@example.com'
    },
    {
      id: '11',
      height: 177,
      password: '12345678',
      phone: '+12345679001',
      name: 'Christopher Garcia',
      dob: new Date('1989-10-05'),
      updatedAt: new Date('2024-01-25'),
      createdAt: new Date('2024-01-25'),
      email: 'christopher.garcia@example.com'
    },
    {
      id: '12',
      height: 169,
      password: '12345678',
      phone: '+12345679011',
      name: 'Amanda Rodriguez',
      dob: new Date('1994-01-28'),
      createdAt: new Date('2024-01-26'),
      updatedAt: new Date('2024-01-26'),
      email: 'amanda.rodriguez@example.com'
    },
    {
      id: '13',
      height: 183,
      password: '12345678',
      name: 'Daniel Lopez',
      phone: '+12345679021',
      dob: new Date('1984-12-03'),
      updatedAt: new Date('2024-01-27'),
      createdAt: new Date('2024-01-27'),
      email: 'daniel.lopez@example.com'
    },
    {
      id: '14',
      height: 166,
      password: '12345678',
      phone: '+12345679031',
      name: 'Jessica Gonzalez',
      dob: new Date('1996-08-17'),
      updatedAt: new Date('2024-01-28'),
      createdAt: new Date('2024-01-28'),
      email: 'jessica.gonzalez@example.com'
    },
    {
      id: '15',
      height: 179,
      password: '12345678',
      phone: '+12345679041',
      name: 'Matthew Perez',
      dob: new Date('1982-05-22'),
      updatedAt: new Date('2024-01-29'),
      createdAt: new Date('2024-01-29'),
      email: 'matthew.perez@example.com'
    },
    {
      id: '16',
      height: 164,
      password: '12345678',
      phone: '+12345679051',
      name: 'Nicole Torres',
      dob: new Date('1990-11-14'),
      updatedAt: new Date('2024-01-30'),
      createdAt: new Date('2024-01-30'),
      email: 'nicole.torres@example.com'
    },
    {
      id: '17',
      height: 181,
      password: '12345678',
      phone: '+12345679061',
      name: 'Andrew Flores',
      dob: new Date('1988-03-09'),
      updatedAt: new Date('2024-02-01'),
      createdAt: new Date('2024-02-01'),
      email: 'andrew.flores@example.com'
    },
    {
      id: '18',
      height: 167,
      password: '12345678',
      phone: '+12345679071',
      name: 'Stephanie Rivera',
      dob: new Date('1992-07-26'),
      createdAt: new Date('2024-02-02'),
      updatedAt: new Date('2024-02-02'),
      email: 'stephanie.rivera@example.com'
    },
    {
      id: '19',
      height: 184,
      password: '12345678',
      phone: '+12345679081',
      name: 'Kevin Collins',
      dob: new Date('1985-09-11'),
      createdAt: new Date('2024-02-03'),
      updatedAt: new Date('2024-02-03'),
      email: 'kevin.collins@example.com'
    },
    {
      id: '20',
      height: 171,
      phone: '+12345679091',
      password: '12345678',
      name: 'Rachel Stewart',
      dob: new Date('1991-04-19'),
      createdAt: new Date('2024-02-04'),
      updatedAt: new Date('2024-02-04'),
      email: 'rachel.stewart@example.com'
    }
  ];

  // get all users
  async getUsers(): Promise<User[]> {
    return await firstValueFrom(of([...this.users]).pipe(delay(500)));
  }

  // get user by id
  async getUserById(id: string): Promise<User | undefined> {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      return await firstValueFrom(of(user).pipe(delay(300)));
    }

    throw new Error('User not found');
  }

  // create user
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.push(newUser);

    return await firstValueFrom(of(newUser).pipe(delay(500)));
  }

  // update user
  async updateUser(id: string, userData: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
    const index = this.users.findIndex((u) => u.id === id);

    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        ...userData,
        updatedAt: new Date()
      };

      return await firstValueFrom(of(this.users[index]).pipe(delay(500)));
    }

    throw new Error('User not found');
  }

  // delete user
  async deleteUser(id: string): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === id);

    if (index !== -1) {
      this.users.splice(index, 1);
      return await firstValueFrom(of(true).pipe(delay(300)));
    }

    return await firstValueFrom(of(false).pipe(delay(300)));
  }

  // search users
  async searchUsers(query: string): Promise<User[]> {
    const filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase()) || user.phone.includes(query)
    );

    return await firstValueFrom(of(filteredUsers).pipe(delay(300)));
  }

  // helper method to generate id
  private generateId(): string {
    return (Math.max(...this.users.map((u) => parseInt(u.id))) + 1).toString();
  }
}
