import { ProductService } from './../product-service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './product';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  _listFilter = '';
  products: Array<Product>;
  filteredProducts: Array<Product>;
  subscription: Subscription;
  errorMessage: string;

  constructor(private productService: ProductService) {}

  get listFilter() {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.subscription = this.productService
      .getProducts()
      .subscribe(
        products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error => (this.errorMessage = <any>error)
      );
    this.filteredProducts = this.products;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  performFilter(filterBy: string): Array<Product> {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) => {
      return product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
