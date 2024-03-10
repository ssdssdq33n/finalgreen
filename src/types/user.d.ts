
interface IUser{
    userId:number
    matkhau:string
    email: string
    name: string
    tendangnhap: string
}
interface ICategory{
    categoryId:number
    name:string
}
interface ISize{
    key:string;
    value:string
}
interface IProduct{
    productId:number;
    name:string;
    decription:string;
    quantity:number;
    size:string;
    sale:number;
    price:number;
    categoryId:number
}
interface Icart{
    cartId:number;
    quantity:number;
    size:string;
    username:string;
    product:IProduct;
}
interface AddOrUpdate<T> {
    visible: boolean;
    header?: string;
    defaultValues: T;
  }

interface IImage{
    imageId?:number
    imageProduct?:string
    file1:File
    url?:any
    productId:number
}