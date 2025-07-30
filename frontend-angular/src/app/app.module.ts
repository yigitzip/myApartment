import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlatService } from './flat.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CreateFlatComponent } from './create-flat/create-flat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';  
import { authInterceptor } from './auth.interceptor';
import { TlCurrencyPipe } from './tl-currency.pipe';
import { FinanceDashboardComponent } from './finance-dashboard/finance-dashboard.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    CreateFlatComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TlCurrencyPipe,
    FinanceDashboardComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    FlatService,
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
