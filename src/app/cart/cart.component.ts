import { Component, OnInit } from '@angular/core';
import { PathService } from '../services/path.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router} from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  amount: number = 0;
  data: any;
  dataa: any = [];
  id: any;
  x: any;
  cartData : any = []
  show: boolean = false;
  public name: string = '';
  public email: string = '';
  public msg: string = '';

  constructor(
    public path: PathService,
    private http: HttpClient,
    private route : Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  onDelete(row: any) {
    console.log(row);
    this.path.deleteData(row._id).subscribe((res) => {
      this.amount -= row.total;
      row.showdata = false;
      row.quantity = 0;
      row.total = row.price;
      this.findProductId(row);
      this.getData();
    });
  }

  

  getData() {
    this.path.getThisData().subscribe((res) => {
      this.data = res;
    });
  }

  getAll() {
    this.path.getThisData().subscribe((res) => {
      this.data = res;
      this.data.forEach((a: any) => {
        this.amount += a.total;
      });
    });
  }

  patchProductData(id: any, info: any) {
    this.path.patchProductData(id, info)
    .subscribe((res) => {});
  }

  patchCartData(id: any, info: any) {
    this.path.patchCartData(id, info)
    .subscribe((res) => {});
  }

  findProductId(info: any) {
    this.path.matchProductId(info).subscribe(async (res) => {
      this.id = await res;
      this.patchProductData(this.id, info);
    });
  }

  checkPlus(row: any) {
    row.quantity++;
    row.total += row.price;
    this.amount += row.price;   
    this.patchCartData(row._id, row);
    this.findProductId(row);

  }

  checkMinus(row: any) {
    row.quantity--;
    if (row.quantity == 0) {
      row.amount = 0;
      row.showdata = false;
      this.onDelete(row);
    } else {
      row.total -= row.price;
      this.amount -= row.price;
      this.patchCartData(row._id, row);
      this.findProductId(row);
    }
  }

  onCheckout(){
  this.route.navigateByUrl('/checkout')
  }

  // collectCartData(){
  //   this.data.map((res: any) => {
  //      this.cartData.push(res.name,res.quantity)
  //   })

  //   console.log(this.cartData)
  // }

  // public sendEmail(e: Event) {
  //   e.preventDefault();
  //   emailjs
  //     .sendForm(
  //       'service_r4nwa9p',
  //       'template_ovmu18n',
  //       e.target as HTMLFormElement,
  //       '7CtQxDnkazztkr2M8'
  //     )
  //     .then(
  //       (result: EmailJSResponseStatus) => {
  //         console.log(result);
  //       },
  //       (error: { text: any }) => {
  //         console.log(error.text);
  //       }
  //     );

  //   let data = {
  //     service_id: 'service_r4nwa9p',
  //     template_id: 'template_ovmu18n',
  //     user_id: '7CtQxDnkazztkr2M8',
  //     template_params: {
  //       user_name: this.name,
  //       user_email: this.email,
  //       user_message: this.msg,
  //       cart_Data: JSON.stringify(this.data),
  //     },
  //   };


  //   this.http
  //     .post('https://api.emailjs.com/api/v1.0/email/send', data, {
  //       responseType: 'text',
  //     })
  //     .subscribe(
  //       (result) => {
  //         alert('Your message has been sent!');
  //       },
  //       (error: HttpErrorResponse) => {
  //         alert('Oops... ' + error.message);
  //       }
  //     );
  // }

  

}
