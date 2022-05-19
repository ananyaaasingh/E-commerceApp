import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { PathService } from '../services/path.service';
import { checkoutModel } from './checkout.model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkObj : checkoutModel = new checkoutModel
  selectAddressType : any = 'Select address type'
  pincode!: string | null;
  addressData : any
  constructor( private path : PathService, private route : Router) { }

  ngOnInit(): void {
   this.pincode =  sessionStorage.getItem('pincode')
    console.log(this.pincode)
  }

  addressForm = new FormGroup({
    name: new FormControl(''),
    no : new FormControl(''),
    pincode : new FormControl(''),
    flat : new FormControl(''),
    area : new FormControl(''),
    town : new FormControl(''),
    state : new FormControl('')
  });

  onSubmit(){
    console.log(this.addressForm.value)
    this.checkObj.name = this.addressForm.value.name
    this.checkObj.number = this.addressForm.value.no
    this.checkObj.pincode = this.addressForm.value.pincode
    this.checkObj.flat = this.addressForm.value.flat
    this.checkObj.area = this.addressForm.value.area
    this.checkObj.town = this.addressForm.value.town
    this.checkObj.state = this.addressForm.value.state
    
   
  }

  onChange(data : any){
    this.selectAddressType = data
  }

  showAddress(){
    
  }

}
