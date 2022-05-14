import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TopComponent, LoginComponent],
  imports: [CommonModule, TopRoutingModule, MatButtonModule],
})
export class TopModule {}
