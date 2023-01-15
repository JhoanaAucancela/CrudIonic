import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore) { }

  public consultar(censos) {
    return this.angularFirestore.collection(censos).snapshotChanges();
  }

  public borrar(censos, documentId) {
    return this.angularFirestore.collection(censos).doc(documentId).delete();
  }

  public actualizar(censos, documentId, datos) {
    return this.angularFirestore.collection(censos).doc(documentId).set(datos);
  }
}
