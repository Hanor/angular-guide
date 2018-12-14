import { Component, OnInit, OnDestroy } from '@angular/core';
import { DrinksService } from './drinks.service';
import { DrinkModel } from './drink.model';
import { Subscription, BehaviorSubject, config } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Paginator } from '../paginator/paginator.model';
import { MatBottomSheet, PageEvent } from '@angular/material';
import { FilterComponent } from './filter/filter.component';

@Component({
  selector: 'drinks-item',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit, OnDestroy {
  subscriptions$: Subscription = new Subscription()
  
  drinks: Array<DrinkModel>;
  filter: FormGroup;
  filterAsString: string;
  paginator: Paginator;
  offsetOptions: number[] = [5, 10, 25];
  spinner: boolean = false;

  constructor(
    private drinksService: DrinksService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.initializeFilterForm();
    this.initializeUrlWatcher();
  }
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
  getFilterAsString(): any {
    let values = this.getNotNullFormValues();
    if (values) {
      let valuesAsString = JSON.stringify(values);
      valuesAsString = valuesAsString.replace(/\:/gi, '=');
      valuesAsString = valuesAsString.replace(/\}/gi, ',');
      valuesAsString = valuesAsString.replace(/\{|\"/gi, '');
      return valuesAsString.replace(/\,$/, '').trim();
    } else {
      return null;
    }
  }
  getNotNullFormValues(): any {
    let formValues: any = this.filter.value;
    let values: any = {};
    let has = false;
    for (let key of Object.keys(formValues)) {
      if (formValues[key]) {
        values[key] = formValues[key];
        has = true;
      }
    }
    return (has) ? values : null;
  }
  eventCleanFilter(): void {
    this.filterAsString = null;
    this.filter.reset();
    this.loadDrinks({});
  }
  eventFilter(): void {
    this.subscriptions$.add(this.bottomSheet.open(FilterComponent, {data: this.filter}).afterDismissed().subscribe((result) => {
      if (result) {
        let values = this.getFilterAsString();
        if (values && values !== '' && values !== this.filterAsString) {
          this.spinner = true;
          this.paginator = null;
          this.loadDrinks(this.getParamsToQuery());
        }
      }
    }));
  }
  
  eventNavigate(): void {
    /**
     * 
     * O modo como é passado a paginação pode mudar conforme o backend. Pois, é ele quem define o modelo e quem realiza de forma correta a paginação.
     * 
    */
    this.router.navigate(['.'], {relativeTo: this.route, queryParams: this.getParamsToQuery()});
  }
  eventPageChange(paginator: Paginator): void {
    this.loadDrinks(this.getParamsToQuery());
  }
  eventUrlChange(): void {
    this.subscriptions$.add(this.route.queryParams.subscribe((params) =>{
      /**
       * 
       * Exemplo de como funciona
       * 
      */
      console.log(params);
    }))
  }
  getParamsToQuery(): any {
    let params: any = this.getNotNullFormValues();
    if (params) {
      this.filterAsString = this.getFilterAsString();
    } else {
      params = {};
    }

    if (this.paginator) {
      for (let key of Object.keys(this.paginator)) {
        if (this.paginator[key]) {
          params[key] = this.paginator[key];
        }
      }
    }
    return params;
  }
  initializeFilterForm(): void {
    let params = this.route.snapshot.queryParams;
    this.filter = this.formBuilder.group({
      name: [params.name],
      type: [params.type],
      manufacturer: [params.manufacturer],
      country: [params.country],
      moreThan: [params.moreThan],
      lessThan: [params.lessThan]
    })
    this.filterAsString = this.getFilterAsString();
  }
  initializeUrlWatcher(): void {
    let params = this.route.snapshot.queryParams;
    this.loadDrinks(params);
    
    /**
     * 
     * Exemplo de observable para os parametros de query do Angular
     * 
    */
    this.eventUrlChange();
  }
  loadDrinks(params: any): void {
    /**
    *  No exemplo a seguir, o método chamado: this.drinksServive.getDrinks(), retorna um observable do tipo: Array<DrinksModel>.
    *  Quando é feito um "subscribe" estamos assinando um evento que será disparado toda a vez que o valor do observable mudar. 
    *  Quando este evento for disparado iremos executar o que definimos no subscribe.
    *  Quando o serviço retorna sucesso, devolve uma variável que contém todos os drinks disponíveis no sistema.
    *  Quando ocorre erro, então será executado a função de erro
    */
    this.subscriptions$.add(this.drinksService.getDrinks(params).subscribe((result) => {
      this.drinks = result.drinks;
      this.spinner = false;
      this.paginator = new Paginator(result.paginator.page, result.paginator.size, result.paginator.offset);

      this.eventNavigate();
    }, (error: any) => {
      console.error(error);	
    }))
  }
}