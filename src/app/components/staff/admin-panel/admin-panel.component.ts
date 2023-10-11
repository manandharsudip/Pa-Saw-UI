import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/main/models/object-model';
import { AuthService } from 'src/app/services/auth.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  signInForm!: FormGroup;
  signInFormValue: any = {};
  userDto: User = new User();
  userData: any;
  selectedFile!: File;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // why do we need this?/

    this.signInForm = new FormGroup({
      categoryname: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      imageurl: new FormControl(null, Validators.required)
    });
  }

  public onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmitSignIn(): void {
    const formData = new FormData();

    console.log("Category:", this.signInForm.get('categoryname')?.value);
    console.log("description:", this.signInForm.get('description')?.value);

    formData.append(
      'categoryname',
      this.signInForm.get('categoryname')?.value
    );
    formData.append(
      'description',
      this.signInForm.get('description')?.value
    );
    if (this.selectedFile) {
      // formData.append('imageurl', this.selectedFile, this.selectedFile.name);
      formData.append('imageurl', this.selectedFile);
    }

    const formDataObject: any = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    
  
    // Print the plain object to inspect its contents
    // console.log(formDataObject);
    // console.log(this.signInForm.value);

    // this.authService.authLogin(this.signInForm.value).subscribe((response) => {
      this.http.post(
        environment.baseUrl + '/api/ems/category/login',
        formData,
        {
          headers: new HttpHeaders({
            // 'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'multipart/form-data'
          }),
        }).subscribe((response) => {
      this.userData = response;
      
    });
  }
}

