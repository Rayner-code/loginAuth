// src/app/services/mock-users.service.ts
import { Injectable } from '@angular/core';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  image: string;
  role: 'admin' | 'moderator' | 'user';
}

@Injectable({ providedIn: 'root' })
export class MockUsersService {
  private users: User[] = [
    // 👇 Pega aquí solo los campos que necesitas del archivo
    { id: 1, firstName: 'Emily', lastName: 'Johnson', email: 'emily.johnson@x.dummyjson.com', username: 'emilys', password: 'emilyspass', image: 'https://dummyjson.com/icon/emilys/128', role: 'admin' },
    { id: 2, firstName: 'Michael', lastName: 'Williams', email: 'michael.williams@x.dummyjson.com', username: 'michaelw', password: 'michaelwpass', image: 'https://dummyjson.com/icon/michaelw/128', role: 'admin' },
    { id: 3, firstName: 'Sophia', lastName: 'Brown', email: 'sophia.brown@x.dummyjson.com', username: 'sophiab', password: 'sophiabpass', image: 'https://dummyjson.com/icon/sophiab/128', role: 'admin' },
    // ... agrega más según necesites (hasta 10-15 para no sobrecargar)
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }
}