import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterest } from '../product-interest';
import { ProductInterestsService } from '../product-interests.service';

@Component({
  selector: 'app-product-interests-list',
  templateUrl: './product-interests-list.component.html',
  styleUrls: ['./product-interests-list.component.css']
})
export class ProductInterestsListComponent implements OnInit {

  items: ProductInterest[];
  product_id: string;

  constructor(protected route: ActivatedRoute, private service: ProductInterestsService) { 
    this.product_id = null;
  }

  ngOnInit(): void {
    this.product_id = this.route.snapshot.paramMap.get('product_id');

    if(this.product_id != null) {
      this.getAll();
    }
  }

  getAll() {
    this.service.getAll(parseInt(this.product_id)).subscribe((data: any) => this.items = data);
  }

  delete(id: number) {
    this.service.delete(parseInt(this.product_id), id).subscribe(
      (data: any) => this.callbackSuccess(),
      (error: any) => this.callbackError(error)
    );
  }

  private callbackSuccess() {
    alert('Registro excluído com sucesso');
    this.getAll();
  }

  private callbackError(error: any) {
    alert('Ocorreu um problema ao excluir');
    console.log(error);
  }

}
