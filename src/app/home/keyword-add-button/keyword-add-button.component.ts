import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddKeywordDialogComponent } from '@/home/keyword-add-button/add-keyword-dialog/add-keyword-dialog.component';

@Component({
  selector: 'app-keyword-add-button',
  templateUrl: './keyword-add-button.component.html',
  styleUrls: ['./keyword-add-button.component.scss'],
})
export class KeywordAddButtonComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(AddKeywordDialogComponent, {
      width: '80%',
    });
  }
}
