import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/main/models/object-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{


  signInForm!: FormGroup;
  href: String = '';
  isRegistration: Boolean = false;
  signInFormValue: any = {};
  userDto: User = new User;

  constructor(private router: Router, private http: HttpClient){

  }

  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href === "/sign-up"){
      this.isRegistration = true;
    } else if (this.href === "/sign-in"){
      this.isRegistration = false;
    }

    this.signInForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmitSignUp(): void {
    const postData = this.signInForm.value;
    this.http.post(environment.baseUrl+"/login", postData).subscribe(response => {
      console.log(" Auth Token: ", response);
    })
  }


  
}
