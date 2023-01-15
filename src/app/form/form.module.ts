import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPageRoutingModule } from './form-routing.module';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { FormPage } from './form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [FormPage],
  providers: [Geolocation]
})
export class FormPageModule {}
