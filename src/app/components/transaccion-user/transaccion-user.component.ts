import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Transfer } from '../../interfaces/transfer';

@Component({
  selector: 'app-transaccion-user',
  templateUrl: './transaccion-user.component.html',
  styleUrls: ['./transaccion-user.component.css']
})
export class TransaccionUserComponent {
  transferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TransaccionUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.transferForm = this.fb.group({
      monto: [null, [Validators.required, Validators.min(0.01)]],
      numero_cuenta_destino: [''],
      codigo_verificacion: ['', Validators.required]
    });
  }

  submitTransfer(): void {
    if (this.transferForm.valid) {
      const transferData: Transfer = this.transferForm.value;
      this.dialogRef.close(transferData); 
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
