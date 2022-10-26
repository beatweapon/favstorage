import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PwaTopComponent } from './pwa-top.component';

const routes: Routes = [{ path: '', component: PwaTopComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PwaTopRoutingModule {}
