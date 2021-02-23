import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgxMaskModule } from "ngx-mask";
import { NgxCurrencyModule } from "ngx-currency";
import { ToastrModule } from "ngx-toastr";

import { BeneficioService } from './_service/Beneficio.service';

import { AppComponent } from './app.component';
import { BeneficiosComponent } from './beneficios/beneficios.component';
import { NavComponent } from './nav/nav.component';
import { ServidoresComponent } from './servidores/servidores.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TramitesComponent } from './tramites/tramites.component';
import { TituloComponent } from './_shared/titulo/titulo.component';

import { DateTimeFormat } from './_helps/DateTimeFormatPipe.pipe';
import { CategoriasComponent } from './categorias/categorias.component';
import { OrgaosComponent } from './orgaos/orgaos.component';
import { SetoresComponent } from './setores/setores.component';
import { ServidorService } from './_service/Servidor.service';
import { BeneficioEditComponent } from './beneficios/beneficioEdit/beneficioEdit.component';

@NgModule({
  declarations: [										
    AppComponent,
    NavComponent,
    BeneficiosComponent,
    BeneficioEditComponent,
    ServidoresComponent,
    DashboardComponent,
    TramitesComponent,
    TituloComponent,
    DateTimeFormat,
    OrgaosComponent,
    CategoriasComponent,
    SetoresComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxCurrencyModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BeneficioService,
    ServidorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
