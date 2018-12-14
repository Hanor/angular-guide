import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SystemService } from '../system/system.service';
import { UserModel } from './user.model';
import { NavBarState } from '../nav-bar/nav-bar-state.model';
 
@Injectable({ providedIn: 'root' })
export class UserService {

    /**
     * A variável a seguir é um BehaviorSubject cujo o valor é um UserModel(modelo de usuário contendo
     * informações como: email, nome, username e afins).
    */
    currentUser$: BehaviorSubject<UserModel> = new BehaviorSubject(null);

    constructor(
        private http: HttpClient, 
        private router: Router,
        private systemService: SystemService
    ) {}

    signIn(signInForm, persistent): Observable<UserModel> {
        /**
         * Realiza-se a autenticação e é devolvido um token relacionado a esta seção
         * Perceba que neste caso, é usado o pipe e concatMap para realizar a autenticação
         * e então buscar o usuário final. Além disso, quem realiza o subscribe do método do signin
         * recebe como retorno o usuário logado.
        */
        this.systemService.setPersistent(persistent);
        return this.http.post<any>('/api/signIn', signInForm)
        .pipe(
            concatMap((response) => {
                if (response.token) {
                    this.systemService.setSessionVariable('token', response.token);
                    return this.getSignedUser(signInForm.login);
                } else {
                    throw new Error('Id Token not received.');
                }
            })
        );
    }
    signOut(): void {
        /**
         *  Realiza logout do usuário atualmente logado. Removendo consigo suas variáveis e afins
        */
        const user: UserModel = this.currentUser$.getValue();
        this.http.get<any>('/api/signOut/' + user.username).subscribe((response) => {
            if (response.signOut) {
                this.systemService.removeAllSessionVariables();
                this.currentUser$.next(null);
                this.router.navigate(['login']);
            }
        });
    }

    getSignedUser(userName): Observable<UserModel> {
        /**
         * Busca o usuário logado e atualiza a variável current user
         */
        return this.http.get<UserModel>('/api/signedUser/' + userName)
        .pipe(map((user: UserModel) => {
            if (user) {
                this.systemService.setSessionVariable('currentUser', JSON.stringify(user));
                this.currentUser$.next(user);
                return user;
            }
        }));
    }
    getUserMenu(): Observable<Array<NavBarState>> {
        /**
         * Busca as views que o usuário pode acessar.
         */
        return this.http.get<Array<NavBarState>>('/api/getUserMenu/' + this.currentUser$.getValue().username);
    }
}