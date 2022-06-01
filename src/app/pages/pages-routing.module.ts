import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnaliticaDialogoComponent } from "./analitica/analitica-dialogo/analitica-dialogo.component";
import { AnaliticaComponent } from "./analitica/analitica.component";
import { EspecialidadEdicionComponent } from "./especialidad/especialidad-edicion/especialidad-edicion.component";
import { EspecialidadComponent } from "./especialidad/especialidad.component";
import { InicioComponent } from "./inicio/inicio.component";
import { MedicoComponent } from "./medico/medico.component";
import { PacienteEdicionComponent } from "./paciente/paciente-edicion/paciente-edicion.component";
import { PacienteComponent } from "./paciente/paciente.component";


export const routes: Routes = [
    {path : 'paciente', component: PacienteComponent, children:[
        {path : 'nuevo', component: PacienteEdicionComponent},
        {path : 'edicion/:id', component: PacienteEdicionComponent},
      ]},
    {path : 'especialidad', component: EspecialidadComponent, children:[
        {path : 'nuevo', component: EspecialidadEdicionComponent},
        {path : 'edicion/:id', component: EspecialidadEdicionComponent},
      ]},
    {path : 'examen', component: AnaliticaComponent, children:[
        {path : 'nuevo', component: AnaliticaDialogoComponent},
        {path : 'edicion/:id', component: AnaliticaDialogoComponent},
      ]},
    {path : 'medico', component: MedicoComponent},
    {path : 'inicio', component: InicioComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
