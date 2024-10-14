import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currency = "$";

  productsData = [
    {
      image:"1.png",
      title:"Лазерная резка",
      text:"Мы предоставляем полный спектр услуг лазерной резки фанеры, металла и пластика по Вашим эскизам",
      price: 20,
      basePrice:20,
      weight:""
    },
    {
      image:"2.png",
      title:"Фрезеровка",
      text:"Все виды фрезеровочных работ, подгонка деталей с точностью до миллиметра",
      price: 24,
      basePrice:24,
      weight:"2 шт./200 гр."
    },
    {
      image:"3.png",
      title:"Лазерная гравировка",
      text:"Нанесем надписи, рисунки, номера на ",
      price: 18,
      basePrice:18,
      weight:"2 шт./200 гр."
    },
  ];

  form = this.fb.group({
    product:["",Validators.required],
    name:["",Validators.required],
    phone:["",Validators.required],
  })

  constructor(private fb:FormBuilder){

  }

  scrollTo(target:HTMLElement, product?:any){
    target.scrollIntoView({behavior:"smooth"})
    if (product) {
      this.form.patchValue({product: product.title + ' (' + product.price + ' ' + this.currency + ')'});
    }
  }

  changeCurrency(){

    let newCurrency = "$"
    let coefficient= 1

    if(this.currency === "$"){
        newCurrency = "₽"
        coefficient = 90
    } else if (this.currency === "₽"){
        newCurrency = "BYN"
        coefficient = 3
    }  else if (this.currency === "BYN"){
        newCurrency = "¥"
        coefficient = 5
    } else if (this.currency === "¥"){
        newCurrency = "£"
        coefficient = 30
    } else if (this.currency === "£"){
        newCurrency = "€"
        coefficient = 25
    }

    this.currency = newCurrency

    this.productsData.forEach((item:any)=>{
        item.price = +(item.basePrice * coefficient).toFixed(1);
    });

  }

  confirmOrder(){
    if(this.form.valid){
      alert("Спасибо за заказ. Мы скоро свяжемся с Вами!")
      this.form.reset()
    }
  }
}
