import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UpdateCategory } from './staff-category-model';

@Component({
  selector: 'app-staff-category',
  templateUrl: './staff-category.component.html',
  styleUrls: ['./staff-category.component.scss'],
})
export class StaffCategoryComponent implements OnInit {
  // addCategoryForm!: FormGroup;
  selectedFile!: File;
  selectedCategory: UpdateCategory ={
    categoryId: 0,
    categoryname:'',
    image: null,
    description: ''
  };
  formMode: 'add' | 'update' = 'add'; 

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  allCategory: any = [];

  ngOnInit(): void {
    this.fetchAllCategory();

    // this.addCategoryForm = new FormGroup({
    //   categoryname: new FormControl(null, Validators.required),
    //   description: new FormControl(null, Validators.required),
    //   imageurl: new FormControl(null, Validators.required),
    // });
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
    const formData1 = new FormData();
    formData1.set("categoryname", this.selectedCategory.categoryname);
    formData1.set("description", this.selectedCategory.description);

    if (this.selectedFile) {
      formData1.append('imageurl', this.selectedFile);
    }




    const formData = new FormData();

    // console.log('Category:', this.addCategoryForm.get('categoryname')?.value);
    // console.log('Description:', this.addCategoryForm.get('description')?.value);
    // console.log('File:', this.selectedFile);

    // formData.append(
    //   'categoryname',
    //   this.addCategoryForm.get('categoryname')?.value
    // );
    // formData.append(
    //   'description',
    //   this.addCategoryForm.get('description')?.value
    // );

    // if (this.selectedFile) {
    //   formData.append('imageurl', this.selectedFile);
    // }

    if (this.formMode === 'add') {
      this.http
        .post(environment.baseUrl + '/api/ems/category/login', formData1, 
        )
        .subscribe((response) => {
          console.log(response);
        });
        console.log("Add Working");
        // location.reload();
    } else if (this.formMode === 'update') {
      this.http
        .put(environment.baseUrl + '/api/ems/category/update/' + this.selectedCategory.categoryId, formData1, 
        )
        .subscribe((response) => {
          console.log(response);
        });
        location.reload();
      console.log("Update Working");
    }
  }

  public deleteCategoryById(categoryId: number): void {
    this.http
      .delete(environment.baseUrl + '/api/ems/category/delete/' + categoryId)
      .subscribe();
    location.reload();
  }

  // modal form ...
  displayStyle = 'none';

  openPopup(category: any) {
    if ( category == 0 ){
      this.formMode = 'add';

    }
    else if (category !== 0){
      // this.http
      //   .get(environment.baseUrl + '/api/ems/category/441')
      //   .subscribe((data) => {
      //     this.selectedCategory = data;
      //   });
      this.formMode = 'update';
      console.log(category);
      this.selectedCategory = category;
      // console.log(this.selectedCategory.categoryId)
    } 

    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }
}


