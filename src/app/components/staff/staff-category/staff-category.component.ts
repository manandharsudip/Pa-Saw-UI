import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AddBookRequest } from './add-book-model';

@Component({
  selector: 'app-staff-category',
  templateUrl: './staff-category.component.html',
  styleUrls: ['./staff-category.component.scss'],
})
export class StaffCategoryComponent implements OnInit {
  addCategoryForm!: FormGroup;
  selectedFile!: File;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  allCategory: any = [];

  ngOnInit(): void {
    this.fetchAllCategory();

    this.addCategoryForm = new FormGroup({
      categoryname: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      imageurl: new FormControl(null, Validators.required),
    });
  }

  public fetchAllCategory(): void {
    this.http
      .get(environment.baseUrl + '/api/ems/category')
      .subscribe((data) => {
        this.allCategory = data;
      });
  }

  public onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  public onAddingCat(): void {
    const formData = new FormData();

    // console.log('Category:', this.addCategoryForm.get('categoryname')?.value);
    // console.log('Description:', this.addCategoryForm.get('description')?.value);
    // console.log('File:', this.selectedFile);

    formData.append(
      'categoryname',
      this.addCategoryForm.get('categoryname')?.value
    );
    formData.append(
      'description',
      this.addCategoryForm.get('description')?.value
    );

    if (this.selectedFile) {
      formData.append('imageurl', this.selectedFile);
    }

    // const formDataObject: any = {};
    // formData.forEach((value, key) => {
    //   formDataObject[key] = value;
    // });

    // console.log(formDataObject);
    // console.log(this.addCategoryForm.value);

    this.http
      .post(environment.baseUrl + '/api/ems/category/login', formData, 
      )
      .subscribe((response) => {
        console.log(response);
      });
    location.reload();
  }

  public deleteCategoryById(categoryId: number): void {
    this.http
      .delete(environment.baseUrl + '/api/ems/category/delete/' + categoryId)
      .subscribe();
    location.reload();
  }

  // modal form ...
  displayStyle = 'none';

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }
}
