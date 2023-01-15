import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../shared/authentication-service";
import { FirestoreService } from '../services/firestore.service';
import { Tarea } from '../tarea';
import { AlertController } from '@ionic/angular';
import { __values } from 'tslib';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  
  constructor(
    public authService: AuthenticationService, private firestoreService: FirestoreService, private alertController: AlertController
  ) { 
    this.tareaEditando = {} as Tarea;
  }

  tareaEditando: Tarea;  

  

  ngOnInit() {
    this.obtenerListaTareas();
  }
  
  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Tarea
   }];

  obtenerListaTareas(){
    this.firestoreService.consultar("censos").subscribe((resultadoConsultaTareas) => {
      this.arrayColeccionTareas = [];
      resultadoConsultaTareas.forEach((datosTarea: any) => {
        this.arrayColeccionTareas.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
    });
  }

  idTareaSelec: string;
  tareaSelec:any;

  selecTarea(tareaSelec) {
    console.log("Tarea seleccionada: ");
    console.log(tareaSelec);
    this.idTareaSelec = tareaSelec.id;
    this.tareaEditando.tarea = tareaSelec.data.descripcion;
    this.tareaEditando.descripcion = tareaSelec.data.descripcion;
    this.tareaEditando.fecha = tareaSelec.data.fecha;
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("censos", this.idTareaSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaTareas();
      // Limpiar datos de pantalla
      this.tareaEditando = {} as Tarea;
    })
  }

  async alert(tareaSelec){
    
    const alert = await this.alertController.create({
      
      header: 'Actualiza la tarea',
      
      inputs: [
        {
          name: 'NewTarea',
          placeholder: 'Tarea',
          value: tareaSelec.data.tarea,
        },
        {
          name: 'NewDescripcion',
          placeholder: 'Descripcion',
          value: tareaSelec.data.descripcion
        },
        {
          name: 'NewFecha',
          type: 'date',
          placeholder: 'fecha',
          value: tareaSelec.data.fecha
        },
      ],
      buttons: [{ text: 'Guardar', handler : (alertData) => { this.clicBotonModificar( tareaSelec.id, alertData.NewTarea, alertData.NewDescripcion, alertData.NewFecha) }}, 'Cancelar'],
      
    });

    await alert.present();

    
  }
  
  clicBotonModificar(ID, NTarea, NDescripcion, NFecha) {
   
    
    this.idTareaSelec = ID;
    this.tareaEditando.tarea = NTarea;
    this.tareaEditando.descripcion = NDescripcion;
    this.tareaEditando.fecha = NFecha;

    this.firestoreService.actualizar("censos", this.idTareaSelec, this.tareaEditando).then(() => {
      // Actualizar la lista completa
    this.obtenerListaTareas();
      // Limpiar datos de pantalla
    this.tareaEditando = {} as Tarea;
    })
    window.alert("Actualización Exitosa !!")

  
  }
}
