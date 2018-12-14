import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DrinkModel } from './drink.model';
import { Observable } from 'rxjs';
import { Paginator } from '../paginator/paginator.model';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getDrinks(params: any): Observable<any> {
    /*
    * Para fins de testes foi criado um mock.
    * * return this.httpClient.get<Array<DrinkModel>>('/api/getDrinks', {params: {filter: filter, paginator: paginator}});
    * * neste caso, será executado um get em um REST passando como parâmetro: type;
    */
    return this.httpClient.get<Array<DrinkModel>>('/api/getDrinks', {params: params});
  }
}