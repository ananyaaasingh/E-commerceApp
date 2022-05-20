import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PathService {
  public data : any
  url : any
  i! : number
  count : number = 0 
  x : number | undefined
  public cartList : any = []
  public product = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private route : Router, private http : HttpClient) { }

  getData(){
    return this.http.get<any>('http://localhost:5000/products')
    .pipe(map((res:any) => {
      return res
    }))
  }

  getPartData(category : any){
    return this.http.get<any>('http://localhost:5000/products/' + category)
    .pipe(map((res:any) => {
      return res
    }))
  }

  postData(data : any) {
    return this.http.post<any>('http://localhost:5000/products', data)
    .pipe(map((res:any) => {
      return res
    }))
  }

  patchData( data : any){
    return this.http.patch<any>('http://localhost:5000/products/' + data._id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  patchProductData(id : any,data:any) {
    return this.http.patch<any>('http://localhost:5000/products/'+id , data)
    .pipe(map((res : any) => {
      return res
    }))
  }

  matchProductId(data:any){
    return this.http.get<any>('http://localhost:5000/products')
    .pipe(map((res:any) => {
      for(this.i = 0; this.i<res.length; this.i++ ){
        if(res[this.i].name === data.name){
          return res[this.i]._id;
        }
      }    }))
   }

   getUser(){
    return this.http.get<any>('http://localhost:5000/user/login')
     .pipe(map((res : any) =>{
       return res
     }))
   }
   
   postUser(data : any){
   return this.http.post<any>('http://localhost:5000/user/register' , data)
   .pipe(map((res : any) => {
     return res;
   }))
   }

   
   patchUser(id : any, data : any){
   return this.http.patch<any>('http://localhost:5000/user/' + id, data)
   .pipe(map((res : any) => {
     return res
   }))
   }
     
   deleteUser(id : any){
   return this.http.delete<any>('http://localhost:5000/user/' + id)
   .pipe(map((res : any) => {
     return res
   }))
   }

   

   getProduct(){
    return this.product.asObservable();
  }
  
  setProduct(product : any){
    this.cartList.push(...product)
    this.product.next(product)
  }
  
  addToCart(product : any){
    this.cartList.push(product)
    this.product.next(this.cartList)
    console.log(this.cartList)
  }
  
  removeCartItem(product : any){
    this.cartList.map((a:any, index: any) => {
      if(product.id===a.id){
           this.cartList.splice(index,1)
      }
    })
    this.product.next(this.cartList)
  }

  postCartData(data : any){
    return this.http.post<any>('http://localhost:5000/cart' , data)
    .pipe(map((res : any) =>{
      // this.product.next(res)
    this.cartList.push(res)
    this.product.next(this.cartList)
    console.log(this.cartList)
      return res
    }))
  }

  patchCartData(id : any, data:any) {
    return this.http.patch<any>('http://localhost:5000/cart/'+id , data)
    .pipe(map((res : any) => {
      return res
    }))
  }

  matchId(data : any){
    return this.http.get<any>('http://localhost:5000/cart')
    .pipe(map((res : any) => {
      for(this.i = 0; this.i<res.length; this.i++ ){
        if(res[this.i].name === data.name){
          return res[this.i]._id;
        }
      }
     
    })) 
   }

getThisData(){
    return this.http.get<any>('http://localhost:5000/cart')
    .pipe(map((res : any) => {
      return (res);
    }))
}

deleteData(id:number){
  return this.http.delete<any>('http://localhost:5000/cart/' + id)
  .pipe(map((res : any) => {
    this.cartList.pop();
    this.product.next(this.cartList)
    return res;
  }))
 }




}


