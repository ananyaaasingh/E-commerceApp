import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { PathService } from '../services/path.service';
import { sharedModel } from '../shared/shared.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 

  len : number = 0 
  info: any
  dataa : any
  id : any
  searchKey : string = ''
  public filterCategory :  any
  modelObj : sharedModel = new sharedModel()
  currCategory!: string;
  public filterInfo : any

  totalLength! : number 
  page : number = 1

  constructor( public path : PathService, public route : Router) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.path.getData()
    .subscribe(res =>{
      this.dataa = res;
      this.filterCategory = res;
    });
  }

  // onLow() {
  //   this.filterData(this.currCategory);
  //   this.filterCategory = this.filterCategory
  //   .sort((a: any, b: any) => a.price - b.price
  //   );
  // }

  // onHigh() {
  //   this.filterData(this.currCategory);
  //   this.filterCategory = this.filterCategory
  //   .sort((a: any, b: any) => b.price - a.price
  //   );
  // }

  // filterByPrice(x : number, y : number){
  //   this.filterData(this.currCategory);
  //   this.filterCategory = this.filterCategory
  //   .filter((a : any) => {
  //     if(a.price >= x && a.price <= y){
  //       return a;
  //     }
  //   })
  // }

  // filter(category : string){
  // this.currCategory = category;
  // this.filterCategory = this.dataa
  // .filter((a:any) =>{
  //   if(a.category == category || category == '' ){
  //     return a;
  //   }
  // })
  // }

  onLow(){
    this.filterCategory = this.filterCategory
      .sort((a: any, b: any) => a.price - b.price
      );
    }
  

  onHigh(){
    this.filterCategory = this.filterCategory
    .sort((a: any, b: any) => b.price - a.price
    );
  
  }

  filterByPrice(x : number , y : number){
    this.filterCategory = this.filterCategory
      .filter((a : any) => {
        if(a.price >= x && a.price <= y){
          return a;
        }
      })
  }
                                                                    
  
  filterData(category : string){
    this.currCategory = category
    this.path.getPartData(category)
    .subscribe((res) => {
      this.dataa = res
      this.filterCategory = res
      this.totalLength = res.length
    })
    }

  postDetails(row:any)
  {
    this.path.postData(row)
    .subscribe((res:any) => {
    }) 
  }

  patchDetails(info: any){
   this.path.patchData(info)
    .subscribe( (res : any) =>{
    })
  }

  postCartData(info : any){
    this.path.postCartData(info)
    .subscribe((res) => {
    })
  }

  patchCartData(id : any,info : any){
  this.path.patchCartData(id,info)
  .subscribe((res) => {
  })
  }

   findCartId(info:any){
    this.path.matchId(info)
    .subscribe(async (res) => {
      this.id = await res
      this.patchCartData(this.id, info)

    })
  }

  deleteCart(info : any){
    this.path.matchId(info)
    .subscribe(async (res) => {
      this.id = await res
     this.onDelete(this.id)

    })
  }

  onDelete(row:any){
    this.path.deleteData(row)
    .subscribe(res =>{
    })
    }

  addCart(row : any){
  row.quantity++
  row.showdata = true
  this.modelObj.id  = row._id
  this.modelObj.name = row.name;
  this.modelObj.description = row.description;
  this.modelObj.image = row.image
  this.modelObj.quantity = row.quantity
  this.modelObj.showdata = row.showdata
  this.modelObj.price = row.price
  this.modelObj.total = row.total
  this.patchDetails(this.modelObj)
  this.postCartData(this.modelObj)
  }

  checkPlus(row : any){
  row.quantity++
  row.total += row.price
  this.modelObj.id  = row._id
  this.modelObj.name = row.name;
  this.modelObj.description = row.description;
  this.modelObj.image = row.image
  this.modelObj.quantity = row.quantity
  this.modelObj.showdata = row.showdata
  this.modelObj.price = row.price
  this.modelObj.total = row.total
  this.patchDetails(this.modelObj)
  this.findCartId(this.modelObj)
  }

  checkMinus(row : any){

  if(row.quantity > 1){
    row.quantity--
    row.total -= row.price
    this.modelObj.id  = row._id
    this.modelObj.name = row.name;
    this.modelObj.description = row.description;
    this.modelObj.image = row.image
    this.modelObj.quantity = row.quantity
    this.modelObj.showdata = row.showdata
    this.modelObj.price = row.price
    this.modelObj.total = row.total
    this.patchDetails(this.modelObj)
    this.findCartId(this.modelObj)
  }
  else if(row.quantity ==1 ){
    row.quantity--
    row.total =row.price
    row.showdata = false
    this.modelObj.id  = row._id
    this.modelObj.name = row.name;
  this.modelObj.description = row.description;
  this.modelObj.image = row.image
  this.modelObj.quantity = row.quantity
  this.modelObj.showdata = row.showdata
  this.modelObj.price = row.price
  this.modelObj.total = row.total
  this.patchDetails(this.modelObj)
  this.deleteCart(this.modelObj)
  }
  }

  onNavigate(){
    this.route.navigateByUrl('/cart')
  }

}
