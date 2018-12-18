import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrinksModule } from './drinks/drinks.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AppMaterialModule } from './app-material.module';
import { JwtInterceptor } from './api/jwt-interceptor.service';
import { ErrorInterceptor } from './api/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DrinksModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule
  ],
  providers: [
    /**
     * Toda a vez que um http for chamado, será injetado no header do http do jwt token oriundo da chamada.
     * Além disso, para este exemplo o JWTInterceptor VAI ATUAR COMO UM MOCK!.
     */
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, 
    /**
     * Toda a vez que um http for respondido, será executado este interceptor. Usa-se este interceptor geralmente para verificar se deu 401 por conta de não haver usuário
     * ou o token estiver vencido!
     */
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
