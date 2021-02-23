import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiosComponent } from './beneficios/beneficios.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrgaosComponent } from './orgaos/orgaos.component';
import { SetoresComponent } from './setores/setores.component';
import { TramitesComponent } from './tramites/tramites.component';
import { ServidoresComponent } from "./servidores/servidores.component";
import { BeneficioEditComponent } from './beneficios/beneficioEdit/beneficioEdit.component';

const routes: Routes = [
  { path: 'beneficios', component: BeneficiosComponent },
  { path: 'beneficio/:id/edit', component: BeneficioEditComponent },
  { path: 'servidores', component: ServidoresComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tramites', component: TramitesComponent },
  { path: 'orgaos', component: OrgaosComponent },
  { path: 'setores', component: SetoresComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: '', redirectTo: 'beneficios', pathMatch: 'full' },
  { path: '**', redirectTo: 'beneficios', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
