import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PathService } from '../services/path.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private users : Array<any> = [];
  isRegister : boolean = false;
  registerForm = this.formbuilder.group({
    name : ['',[ Validators.required, Validators.minLength(3)]],
    email : [''],
    number : [''],
    password : ['']
  });
  
  register: any;
  
  constructor(private formbuilder: FormBuilder, private router : Router, private path : PathService) { }

  ngOnInit(): void {
  }

  onSubmit(){
  this.path.postUser(this.registerForm.value)
 .subscribe((res : any) => {
   console.log(res)
 })
 this.router.navigateByUrl('/login')
  }


  get f() {
    return this.registerForm.controls;
  }


}





