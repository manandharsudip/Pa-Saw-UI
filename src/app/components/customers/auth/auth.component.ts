import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/main/models/object-model';
import { AuthService } from 'src/app/services/auth.services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  href: String = '';
  isRegistration: Boolean = false;
  signInFormValue: any = {};
  userDto: User = new User();
  userData: any;
  loggedIn: Boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {

    const user_session_id = sessionStorage.getItem('Access Token');
    if (user_session_id) {
      this.loggedIn = true;
    }

    this.href = this.router.url;
    if (this.href === '/signUp') {
      this.isRegistration = true;
    } else if (this.href === '/signIn') {
      this.isRegistration = false;
    }


    // why do we need this?/

    this.signInForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.signUpForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmitSignUp(): void {
    // console.log(this.signUpForm.value);
    this.authService.authRegister(this.signUpForm.value).subscribe();
    this.router.navigateByUrl('signIn');
  }

  onSubmitSignIn(): void {
    this.authService.authLogin(this.signInForm.value).subscribe((response) => {
      this.userData = response;
      if (this.userData) {
        if (
          this.userData.userPrincipal.authorities[0].authority ===
          'ROLE_CUSTOMER'
        ) {
          sessionStorage.setItem('Access Token', this.userData.accessToken);
          sessionStorage.setItem(
            'Role',
            this.userData.userPrincipal.authorities[0].authority
          );
          // console.log(this.userData.userPrincipal.userId);
          sessionStorage.setItem('User ID', this.userData.userPrincipal.userId);
          this.router.navigateByUrl('');
        } else {
          alert('Invalid Login');
        }
      }
    });
  }
}
