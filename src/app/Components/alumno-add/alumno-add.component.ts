import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard, MatCardModule } from '@angular/material/card'
import { MaterialModule } from 'src/app/modules/material/material.module';

@Component({
  selector: 'app-alumno-add',
  templateUrl: './alumno-add.component.html',
  styleUrls: ['./alumno-add.component.css']
})
export class AlumnoAddComponent implements OnInit {

  pais = new FormControl('', [Validators.required, Validators.minLength(3)]);

  //Agrupar controles de formulario con FormGroup (creacion manual de instancias)
  formPais = new FormGroup({
    pais: new FormControl('', [Validators.required]),
    capital: new FormControl('', [Validators.required]),
  });

  //Usar formBuilder para generar controles (generador de formularios)
  formGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(5)],],
    apellido: ['', [Validators.required, Validators.minLength(5)]],
    edad: ['', [Validators.required, Validators.min(18)]],
    universidad: this.formBuilder.group({
      nombre: ['', [Validators.required]],
      sede: ['', [Validators.required]]
    })
  });

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.valueChanges();
  }

  get nombreInvalido() {
    return this.formGroup.get('nombre')?.invalid && this.formGroup.get('nombre')?.touched;
  }

  get apellidoInvalido() {
    return this.formGroup.get('apellido')?.invalid && this.formGroup.get('apellido')?.touched;
  }
  get edadInvalido() {
    return this.formGroup.get('edad')?.invalid && this.formGroup.get('edad')?.touched;
  }

  guardar() {
    this.snackBar.open('formulario valido', '', { duration: 1000 });
  }

  resetFormulario() {
    this.formGroup.reset({
      nombre: 'Miguel',
      apellido: 'Aspilcueta',
    });
  }

  valueChanges() {
    this.formGroup.get('nombre')?.valueChanges.subscribe((valor: string) => {
      this.formGroup.patchValue({ nombre: valor.toUpperCase() }, { emitEvent: false });
      if (this.formGroup.get('nombre')?.invalid) {
        this.snackBar.open('nombre no es valido', '', { duration: 1000 });
      }
    });
    this.formGroup.get('apellido')?.valueChanges.subscribe((valor: string) => {
      this.formGroup.patchValue({ apellido: valor.toUpperCase() }, { emitEvent: false });
    });
  }

  updatePais() {
    this.pais.setValue('Perú');
  } 
}
