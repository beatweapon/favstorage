import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-url-copy-button',
  templateUrl: './url-copy-button.component.html',
  styleUrls: ['./url-copy-button.component.scss'],
})
export class UrlCopyButtonComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  get url() {
    return window.location.href;
  }

  openSnackBar() {
    const message = 'URLをコピーしました';
    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
  }
}
