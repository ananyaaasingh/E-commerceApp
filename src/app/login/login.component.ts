import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathService } from '../services/path.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email : any;
  password : any;

  

  constructor(private path: PathService, private router : Router ) { }

  ngOnInit(): void {
  }

  
  onlogin(): void{
  //   console.log(this.email, this.password)
  // if(this.path.check(this.email, this.password)){
  // localStorage.setItem('key1', "true");

  this.router.navigateByUrl("/cart");

  // }
  // else{
  //   alert("login failed")
  // }
   }

}

