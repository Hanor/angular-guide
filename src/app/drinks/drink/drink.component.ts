import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DrinkModel } from '../drink.model';
import { DrinksComponent } from '../drinks.component';

@Component({
  selector: 'ui-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit, OnDestroy {

  /**
   * Neste caso, é passado para este componente filho a informação: 'drink' por meio de um @Input.
   * Existem outras formas de se passar contextos entre filhos e pais. Na maioria das vezes se faz pela
   * injeção do pai no filho ou por meio de @Input
   */
  @Input('drink') drink: DrinkModel;

  constructor(
    private drinksComponent: DrinksComponent
  ) {}

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }
}
