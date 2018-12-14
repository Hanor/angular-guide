import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemService } from '../system/system.service';
import { UserModel } from '../user/user.model';
import { NavBarState } from '../nav-bar/nav-bar-state.model';
import { DrinkModel } from '../drinks/drink.model';
 
@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private systemService: SystemService
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.systemService.getSessionVariable('token');
        if (token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${token}`
                }
            });
        }
        /**
         *  Se houver um backend, substitua a chamada a seguir e exclua a classe "BackendMock" e remova suas dependências como: UserModel, Drinks e afins. 
         *  Modifique o return a seguir para:
         *  return next.handle(request);
         * 
         */
        return Observable.create((observer) => {
            observer.next(BackendMock.handleState(request)) ;
        })
    }
}

class BackendMock {
    static drinks: Array<DrinkModel> = new Array(
    (new DrinkModel('Cerveja', '1$L32SKIHjmnI2OI0', 'Delirium Nocturnum', 'Delirium', 'Bélgica', '4.00', 2)),
    (new DrinkModel('Cerveja', '*71KoLOADexI2OI0', 'Patagonia - Weisse', 'Patagonia', 'Argentina', '9.00', 8129)),
    (new DrinkModel('Vodka', '*741234@1KoLOADexI2OI0', 'Skyy', 'Skyy', 'Estados Unidos', '2.87', 89)),
    (new DrinkModel('Rum', '*741234@!213', 'Bacardi - mos', 'Bacardi Company', 'Bermuda', '2.87', 49)),
    (new DrinkModel('Vodka', '*741234@çlolkL', 'Absolut', 'Absolut', 'Suécia', '9.87', 10)),
    (new DrinkModel('Cerveja', '*741234@çlol12LOiskL', 'Heinekken', 'Heinekken', 'Holanda', '2.71', 2)),
    (new DrinkModel('Cerveja', '*741234@çlol12LOiskL', 'Glacial', 'Schin', 'Brasil', '0.59', 14)));


    static handleState(request: HttpRequest<any>): HttpResponse<any> {
        if (request.url.includes('signIn')) {
            return new HttpResponse<any>({body: {token: '&8239aSDOe{p´slSK)92DBBMQAOS'}});
        } else if (request.url.includes('signedUser')) {
            return new HttpResponse<any>({body: new UserModel('18128asdj', 'darth.vader', 'Anakin SkyWalker', 'darthfather@imperium.star')});
        } else if (request.url.includes('getUserMenu')) {
            /**
            * O correto é estes states virem do servidor.
            */
            let states = new Array(new NavBarState('Início', 'home', 'fas fa-home'), new NavBarState('Bebidas', 'drinks', 'fas fa-wine-glass-alt'));
            return new HttpResponse<any>({body: states});
        } else if (request.url.includes('getDrinks')) {

            let paginator;
            let params = request.params;
            let drinks = BackendMock.drinks.filter((drink) => {
                let matched = 0;
                let expected = 0;
                for(let key of params.keys()) {
                    if (key !== 'page' && key !== 'size' && key !== 'offset') {
                        expected++;

                        if (key === 'lessThan' || key === 'moreThan') {
                            let price: number = parseFloat(drink.price.replace(',', '.'));
                            let keyValue: number = parseFloat(params.get(key).replace(',', '.'));
                            if (key === 'lessThan' && price < keyValue) {
                                matched++;
                            } else if (key === 'moreThan' && price > keyValue) {
                                matched++;
                            }
                        }
                        else if (drink[key].toUpperCase() === params.get(key).toUpperCase()) {
                            matched++;
                        }
                    }
                }
                return expected === matched;
            });
            if (!params.has('page')) {
                paginator = {page: 1, size: '' + drinks.length, offset: 5};
            } else {
                paginator = {page: params.get('page'), size: '' + drinks.length, offset: params.get('offset')};
            }
            let i = (paginator.page * paginator.offset) - paginator.offset
            let initialIndex = i;
            let pagedDrinks = [];

            while(i < initialIndex + paginator.offset && i < paginator.size) {
                pagedDrinks.push(drinks[i]);
                i++;
            }

            return new HttpResponse<any>({body: {drinks: pagedDrinks, paginator: paginator}});
        } else if (request.url.includes('signOut')) {
            return new HttpResponse<any>({body: {signOut: true}});
        } else {
            throw new Error('Metódo não mapeado no MOCK:' + request.url)
        }
    }
}