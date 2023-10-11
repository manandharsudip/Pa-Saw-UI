import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-staff-product',
  templateUrl: './staff-product.component.html',
  styleUrls: ['./staff-product.component.scss'],
})
export class StaffProductComponent {
  addProductForm!: FormGroup;
  selectedFile!: File;
  allProducts: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllProducts();

    this.addProductForm = new FormGroup({
      productname: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      imageurl: new FormControl(null, Validators.required),
      categoryid: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    });
  }

  public onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  public onAddingProduct(): void {
    const formData = new FormData();

    console.log('Category:', this.addProductForm.get('categoryname')?.value);
    console.log('Description:', this.addProductForm.get('description')?.value);
    console.log('File:', this.selectedFile);

    formData.append(
      'productname',
      this.addProductForm.get('productname')?.value
    );
    formData.append('categoryid', this.addProductForm.get('categoryid')?.value);
    formData.append('price', this.addProductForm.get('price')?.value);
    formData.append(
      'description',
      this.addProductForm.get('description')?.value
    );
    formData.append('status', this.addProductForm.get('status')?.value);

    if (this.selectedFile) {
      // formData.append('imageurl', this.selectedFile, this.selectedFile.name);
      formData.append('imageurl', this.selectedFile);
    }

    const formDataObject: any = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    this.http
      .post(environment.baseUrl + '/api/ems/product/add', formData)
      .subscribe((response) => {
        console.log(response);
      });
    location.reload();
  }

  public fetchAllProducts(): void {
    this.http.get(environment.baseUrl+"/api/ems/product").subscribe(data => {
      this.allProducts = data;
    });
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
