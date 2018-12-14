import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinksComponent } from './drinks.component';
import { DrinkComponent } from './drink/drink.component';
import { AppMaterialModule } from '../app-material.module';
import { FilterComponent } from './filter/filter.component';
import { PaginatorComponent } from '../paginator/paginator.component';

@NgModule({
  declarations: [DrinksComponent, DrinkComponent, FilterComponent, PaginatorComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  exports: [DrinksComponent, DrinkComponent, FilterComponent],
  entryComponents: [FilterComponent]
})
export class DrinksModule { }
