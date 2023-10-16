import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/main/models/object-model';
import { AuthService } from 'src/app/services/auth.services';

@Component({
  selector: 'app-auth-staff',
  templateUrl: './auth-staff.component.html',
  styleUrls: ['./auth-staff.component.scss'],
})
export class AuthStaffComponent implements OnInit {
  signInForm!: FormGroup;
  signInFormValue: any = {};
  userDto: User = new User();
  userData: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // why do we need this?/

    this.signInForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmitSignIn(): void {
    const formData = new FormData();

    console.log("Category:", this.signInForm.get('email')?.value);
    console.log("Description:", this.signInForm.get('password')?.value);

    formData.append(
      'email',
      this.signInForm.get('email')?.value
    );
    formData.append(
      'password',
      this.signInForm.get('password')?.value
    );

    const formDataObject: any = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
  
    // Print the plain object to inspect its contents
    console.log(formDataObject);
    console.log(this.signInForm.value);

    this.authService.authLogin(this.signInForm.value).subscribe((response) => {
    // this.authService.authLogin(formDataObject).subscribe((response) => {
      this.userData = response;
      console.log(this.userData.userPrincipal.authorities[0].authority);
      if (this.userData) {
        if (
          this.userData.userPrincipal.authorities[0].authority ===
          'ROLE_ADMIN' || this.userData.userPrincipal.authorities[0].authority ===
          'ROLE_USER'
        ) {
          console.log("This Working..");
          sessionStorage.setItem('Access Token', this.userData.accessToken);
          sessionStorage.setItem(
            'Role',
            this.userData.userPrincipal.authorities[0].authority
          );
          // console.log(this.userData.userPrincipal.userId);
          sessionStorage.setItem('User ID', this.userData.userPrincipal.userId);
          this.router.navigateByUrl('ems/category');
        } else {
          alert('Invalid Login');
        }
      }
    });
  }
}
