import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { AddKeywordDialogComponent } from './add-keyword-dialog/add-keyword-dialog.component';
import { KeywordListComponent } from './keyword-list/keyword-list.component';
import { KeywordCardComponent } from './keyword-list/keyword-card/keyword-card.component';
import { KeywordViewerComponent } from './keyword-list/keyword-card/keyword-viewer/keyword-viewer.component';
import { KeywordEditorComponent } from './keyword-list/keyword-card/keyword-editor/keyword-editor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { KeywordAddButtonComponent } from './keyword-add-button/keyword-add-button.component';
import { DeleteConfirmDialogComponent } from './keyword-list/keyword-card/keyword-editor/delete-confirm-dialog/delete-confirm-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    KeywordListComponent,
    KeywordCardComponent,
    KeywordViewerComponent,
    KeywordEditorComponent,
    HeaderComponent,
    AddKeywordDialogComponent,
    KeywordAddButtonComponent,
    DeleteConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule,
  ],
})
export class HomeModule {}
