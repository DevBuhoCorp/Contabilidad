import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styles: []
})
export class TokenComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TokenComponent>) { }

  ngOnInit() {
  }

}
