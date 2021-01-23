import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { WsFormComponent } from './ws-form/ws-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigFormComponent } from './config-form/config-form.component';


@NgModule({
  declarations: [
    HeaderComponent,
    WsFormComponent,
    ConfigFormComponent
  ],
  exports: [
    HeaderComponent,
    WsFormComponent,
    ConfigFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
