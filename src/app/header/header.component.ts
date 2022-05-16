import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathService } from '../services/path.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  data : any
  len : number | undefined
  public searchTerm : string = ''

  constructor( public route : Router, public path : PathService) { }

  ngOnInit(): void {
   
    this.path.getProduct()
    .subscribe(res=>{
      this.len = res.length;
    })
  }

  search(event : any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.path.search.next(this.searchTerm)
  }

  onHome(){
    this.route.navigateByUrl('/home')
  }
 

  onNavigate(){
    this.route.navigateByUrl('/cart')
  }

  

}
