import { Injectable, signal } from '@angular/core';


export interface UserData {
  name?: string;
  email?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private userData = signal<UserData>({
    name: 'John Doe',
    email: ''
  })

  userData$ = this.userData.asReadonly();
  constructor() { }

  updateUserData(userData: UserData) {
    this.userData.set(userData);
  }

  reset() {
    this.userData.set({
      name: 'John Doe',
      email: ''
    })
  }

}
