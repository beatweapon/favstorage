import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PwaTopRoutingModule } from './pwa-top-routing.module';
import { PwaTopComponent } from './pwa-top.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PwaTopComponent],
  imports: [CommonModule, PwaTopRoutingModule, MatButtonModule],
})
export class TopModule {}
