import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { UserService } from '../user/user.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { AppComponent } from '../app.component';
import { UserModel } from '../user/user.model';
import { NavBarState } from './nav-bar-state.model';


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
/**
  *  Em seu componente, na definição da classe faça ele implementar a interface OnDestroy e na sequência implementar o método: ngOnDestroy.
  *  Com isso, quando o Angular perceber que precisa destruir este componente ele irá executar as instruções implementadas neste método. 
*/
export class NavBarComponent implements OnInit, OnDestroy {
  currentState$: BehaviorSubject<NavBarState> = new BehaviorSubject(null);
  
  /**
   * subscriptions$: Armazena todos os subscribes realizados por este componente
   * quando o componente for destruído todas as subscriptions serão destruídas.
   */
  subscriptions$: Subscription = new Subscription();
  
  states: Array<NavBarState> = new Array();
  user: UserModel;
  
  constructor(
    private router: Router,
    private userService: UserService,
    /**
     * appComponente: É a referência para o componente pai. Que no caso é o AppComponent
     */
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.eventUserChange();
    this.eventUrlChange();
  }
  /**
   * Quando este componente for destruído, todas as assinaturas realizadas deixaram de existir
  */
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
  doLogout(): void {
    this.userService.signOut();
  }
  doRetract(): void {
    this.appComponent.eventRetract();
  }
  eventUserChange(): void {
    /**
     *  Perceba que neste caso, estamos assinando o objeto criado que é do tipo BehaviourSubject, 
     *  e neste caso, toda a vez que o seu valor for modificado estaremos executando a ação 
     *  dentro do subscribe, que no caso do exemplo, estamos atribuindo uma variável interna com o 
     *  valor que recebemos do BehaviourSubject.
     * 
    */
    this.subscriptions$.add(this.userService.currentUser$.subscribe((user: UserModel) => {
      this.user = user
      if (user) {
        this.getNavBarStates();
      }
    }));
  } 
  eventUrlChange(): void {
    this.subscriptions$.add(this.router.events.subscribe((event) =>{
      if (event instanceof NavigationEnd) {
        let url = event.urlAfterRedirects;
        this.loadState(url);
      }
    }))
  }
  getStateByName(name): NavBarState {
    return this.states.filter((state) => {
      return state.name == name;
    })[0];
  }
  getUrlFatherPath(fullUrl): string {
    if (!fullUrl) {
      return '';
    }
    return fullUrl.replace('/', '').split('/')[0].split('?')[0]
  }
  getUrlWithoutParams(url: string): string {
    if (!url) {
      return '';
    }
    return url.split('?')[0]
  }
  getUrlQueryParams(url: string): string {
    return url.split('?')[1]
  }
  getNavBarStates(): void {
    this.subscriptions$.add(this.userService.getUserMenu().subscribe((states) => this.states = states));
    this.loadState(this.getUrlFatherPath(this.router.url));
  }
  loadState(url: string): void {
    let state = this.getUrlFatherPath(url)
    this.currentState$.next(this.getStateByName(state));
  }
}