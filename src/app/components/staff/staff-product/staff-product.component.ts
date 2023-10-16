import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Product } from '../staff-category/staff-category-model';

@Component({
  selector: 'app-staff-product',
  templateUrl: './staff-product.component.html',
  styleUrls: ['./staff-product.component.scss'],
})
export class StaffProductComponent {
  selectedValue!: string;
  addProductForm!: FormGroup;
  selectedFile!: File;
  allProducts: any = [];
  allCategory: any = [];
  formMode: 'add' | 'update' = 'add';

  selectedProduct: Product = {
    produtId: 0,
    productname: '',
    categoryid: '',
    categoryname: '',
    description: '',
    userId: '',
    price: '',
    imageurl: null,
    status: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllProducts();
    this.fetchAllCategory();

    // this.addProductForm = new FormGroup({
    //   productname: new FormControl(null, Validators.required),
    //   description: new FormControl(null, Validators.required),
    //   imageurl: new FormControl(null, Validators.required),
    //   categoryid: new FormControl(null, Validators.required),
    //   price: new FormControl(null, Validators.required),
    //   status: new FormControl(null, Validators.required),
    // });
  }

  public onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  public onAddingProduct(): void {
    const formData = new FormData();

    formData.set('productname', this.selectedProduct.productname);
    formData.set('categoryid', this.selectedProduct.categoryid);
    formData.set('description', this.selectedProduct.description);
    formData.set('price', this.selectedProduct.price);
    formData.set('status', this.selectedProduct.status);

    if (this.selectedFile) {
      // formData.append('imageurl', this.selectedFile, this.selectedFile.name);
      formData.append('imageurl', this.selectedFile);
    }

    const formDataObject: any = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log(formDataObject);

    if (this.formMode === 'add') {
      this.http
        .post(environment.baseUrl + '/api/ems/product/add', formData)
        .subscribe();
      location.reload();
    } else if (this.formMode === 'update') {
      this.http
        .put(environment.baseUrl + '/api/ems/product/update/' + this.selectedProduct.produtId , formData)
        .subscribe();
      location.reload();
    }
  }

  public fetchAllProducts(): void {
    this.http
      .get(environment.baseUrl + '/api/ems/product')
      .subscribe((data) => {
        this.allProducts = data;
      });
  }

  public fetchAllCategory(): void {
    this.http
      .get(environment.baseUrl + '/api/ems/category')
      .subscribe((data) => {
        this.allCategory = data;
      });
  }

  public deleteCategoryById(productId: number): void {
    this.http
      .delete(environment.baseUrl + '/api/ems/product/delete/' + productId)
      .subscribe();
    location.reload();
  }

  // modal form ...
  displayStyle = 'none';

  openPopup(product: any) {
    if (product == 0) {
      this.formMode = 'add';
    } else if (product !== 0) {
      this.formMode = 'update';
      this.selectedProduct = product;
    }

    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }
}
