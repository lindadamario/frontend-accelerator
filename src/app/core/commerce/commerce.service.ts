import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Category } from '@cxcloud/ct-types/categories';
import { PaginatedProductResult, Product } from '@cxcloud/ct-types/products';
import { ShippingMethod } from '@cxcloud/ct-types/shipping';
import { sortByCustomValues } from '../../utils/helpers';

@Injectable()
export class CommerceService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>('/categories')
      .do(categories => this.sortCategories(categories));
  }

  getProducts(categoryId: string): Observable<PaginatedProductResult> {
    return this.http.get<PaginatedProductResult>(
      `/products/byCategory/${categoryId}`
    );
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`/products/${productId}`);
  }

  getShippingMethods(): Observable<ShippingMethod[]> {
    return this.http.get<ShippingMethod[]>('/shipping/methods');
  }

  sortCategories(categories) {
    const order = [
      'clothing',
      'shoes',
      'bags',
      'looks',
      'women',
      'men',
      'special',
      'accessories',
      'new',
      'brands',
      'sale'
    ];
    // Sort categories and sub categories by given order
    sortByCustomValues(categories, order, 'name.en');

    categories.forEach(category => {
      if (category.hasOwnProperty('subCategories')) {
        this.sortCategories(category.subCategories);
      }
    });
  }
}
