export interface UpdateCategory {
  categoryId: number;
  categoryname: string;
  description: string;
  image: File | null;
}

export interface Product {
  produtId: number;
  productname: string;
  categoryid: string;
  categoryname: string;
  description: string;
  userId: string;
  price: string;
  imageurl: File | null;
  status: string;
}


export interface Order{
  
}
