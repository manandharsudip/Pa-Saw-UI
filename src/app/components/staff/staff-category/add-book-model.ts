export interface AddBookRequest{
    title: string;
    category: string;
    author: string;
    price: number;
    image: File | null;
    description:string;

}