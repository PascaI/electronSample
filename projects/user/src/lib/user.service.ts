import { Injectable } from '@angular/core';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    { firstName: 'Max', lastName: 'Muster1'},
    { firstName: 'Max', lastName: 'Muster2'},
    { firstName: 'Max', lastName: 'Muster3'},
    { firstName: 'Max', lastName: 'Muster4'},
  ];

  constructor() { }

  getUsers() {
    return this.users;
  }

  getUser() {
    return this.users[1];
  }
}
