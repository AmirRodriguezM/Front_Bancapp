import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-monto-dialog',
  templateUrl: './monto-dialog-component.component.html',
  styleUrls: ['./monto-dialog-component.component.css']
})
export class MontoDialogComponent implements OnInit {
  form: FormGroup;
  operacion: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MontoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { operacion: string }
  ) {
    this.operacion = data.operacion;
    this.form = this.fb.group({
      monto: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {}

  confirmar(): void {
    if (this.form.invalid) {
      return;
    }

    const monto = this.form.value.monto;
    this.dialogRef.close(monto); 
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}
