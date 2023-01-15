import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  public censoForm: FormGroup;

  @Input() user: any;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public db: AngularFirestore
  ) {
  
    this.user = JSON.parse(localStorage.getItem('user')!).email;
    
    this.censoForm = this.formBuilder.group({
      registra: [{ value: '', disabled: true }, Validators.required],
      tarea: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }



  async ngOnInit() {}

  guardarCenso() {
    const censo = {
      tarea: this.censoForm.value.tarea,
      descripcion: this.censoForm.value.descripcion,
      fecha: this.censoForm.value.fecha,
      registra: this.user
    };
    if (!this.censoForm.valid) {
      window.alert('Por favor llena todos los campos!');
    } else {
      this.db
        .collection('censos')
        .add(censo)
        .then(() => {
          window.alert('Información guardada con exito!');
          this.router.navigate(['dashboard']);
        });
    }
  }
}
