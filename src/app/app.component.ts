import { Component, computed, effect, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AppServiceService, UserData } from './app-service.service';

@Component({
  selector: 'app-root',
  imports: [
    MatFormFieldModule,
     MatInputModule,
      MatSelectModule,
      MatIconModule,
      MatDatepickerModule,
      MatNativeDateModule ,
      ReactiveFormsModule,
      MatButtonModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title(title: any) {
    return 'unidirectinalFlowApp';
  }
  appForm!: FormGroup;
  userData!: Signal<UserData>
  formReactor!: Signal<void>

  constructor(
    private service: AppServiceService,
    private fb: FormBuilder) {
      this.userData = this.service.userData$;
   this.appForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
   })
   effect(() => {
    const updatedUserData = this.userData();
    if(this.isFormChanged(updatedUserData)) {
      console.log('form updated')
     this.appForm.patchValue(updatedUserData)
    }
  })
  }

  ngOnInit() {
    
  }


  onReset() {
    this.service.reset();
  }

  onSubmit() {
    this.service.updateUserData(this.appForm.value);
  }


  private isFormChanged(userData: UserData): boolean {
    return this.appForm.value.name !== userData.name || this.appForm.value.email !== userData.email;
  }


  


}
