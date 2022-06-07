import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidad } from 'src/app/_modulo/especialidad';
import { EspecialidadService } from 'src/app/_services/especialidad.service';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private especialidadService: EspecialidadService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'descripcion': new FormControl('')
    });
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    })
  }

  initForm() {
    if (this.edicion) {
      this.especialidadService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idEspecialidad),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion)
        })
      })
    }
  }

  operar() {
    let especialidad = new Especialidad;

    especialidad.idEspecialidad = this.form.value['id'];
    especialidad.nombre = this.form.value['nombre'];
    especialidad.descripcion = this.form.value['descripcion'];

    if (this.edicion) {
      this.especialidadService.modificar(especialidad).subscribe(() => {
        this.especialidadService.listar().subscribe(data => {
          this.especialidadService.setEspecialidadCambio(data);
          // this.pacienteService.setMensajeCambio("Se modifico");
        })
      })
    }else{
      this.especialidadService.registrar(especialidad).subscribe(() => {
        this.especialidadService.listar().subscribe(data => {
          this.especialidadService.setEspecialidadCambio(data);
          // this.pacienteService.setMensajeCambio("Se creo");
        })
      })
    }
    // else{
    //   this.pacienteService.registrar(paciente).pipe(switchMap() =>{

    //   })
    this.router.navigate(['especialidad']);
  }
}

