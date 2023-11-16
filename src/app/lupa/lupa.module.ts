import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LupaPageRoutingModule } from './lupa-routing.module';

import { LupaPage } from './lupa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LupaPageRoutingModule
  ],
  declarations: [LupaPage]
})
export class LupaPageModule {}
