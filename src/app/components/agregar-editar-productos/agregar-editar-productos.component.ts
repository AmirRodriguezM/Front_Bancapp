import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsServicesService } from '../../services/products.services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-editar-productos',
  templateUrl: './agregar-editar-productos.component.html',
  styleUrls: ['./agregar-editar-productos.component.css']
})
export class AgregarEditarProductosComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsServicesService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AgregarEditarProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Configuración del formulario
    this.productForm = this.fb.group({
      numero_cuenta: ['', Validators.required], 
      saldo_cuenta: ['', [this.positiveNumberValidator]], 
      fecha_apertura_cuenta: [null],            
      fecha_expiracion_cuenta: [null],          
      codigo_verificacion_cuenta: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    // Determina si estamos en modo edición o creación
    this.isEditMode = !!this.data && !!this.data.id_cuenta_ahorro;

    // Si es modo edición, carga los datos en el formulario
    if (this.isEditMode) {
      this.productForm.patchValue({
        numero_cuenta: this.data.numero_cuenta,
        saldo_cuenta: this.data.saldo_cuenta,
        fecha_apertura_cuenta: this.data.fecha_apertura_cuenta,
        fecha_expiracion_cuenta: this.data.fecha_expiracion_cuenta,
        codigo_verificacion_cuenta: this.data.codigo_verificacion_cuenta
      });
    }

    // Escuchar cambios en la fecha de apertura para establecer automáticamente la fecha de expiración solo si cambia
    this.productForm.get('fecha_apertura_cuenta')?.valueChanges.subscribe((fechaApertura: Date) => {
      if (!this.isEditMode || (this.isEditMode && fechaApertura !== this.data.fecha_apertura_cuenta)) {
        this.setFechaExpiracion(fechaApertura);
      }
    });
  }

  // Validación personalizada para asegurar que saldo_cuenta no sea negativo
  positiveNumberValidator(control: AbstractControl): ValidationErrors | null {
    return control.value >= 0 ? null : { nonPositive: true };
  }

  // Método para establecer la fecha de expiración automáticamente 4 años después de la fecha de apertura
  setFechaExpiracion(fechaApertura: Date | null) {
    if (fechaApertura) {
      const fechaExpiracion = new Date(fechaApertura);
      fechaExpiracion.setFullYear(fechaExpiracion.getFullYear() + 4); // Sumar 4 años
      this.productForm.get('fecha_expiracion_cuenta')?.setValue(fechaExpiracion);
    } else {
      this.productForm.get('fecha_expiracion_cuenta')?.setValue(null);
    }
  }

  // Método para agregar o editar la cuenta de ahorro
  addEditCuentaAhorro() {
    if (this.productForm.invalid) {
      this.toastr.error('Por favor, completa todos los campos obligatorios y asegúrate de que el saldo no sea negativo', 'Error');
      return;
    }

    // Asignar valor de 0 a saldo_cuenta si está vacío
    if (!this.productForm.get('saldo_cuenta')?.value) {
      this.productForm.get('saldo_cuenta')?.setValue(0);
    }

    // Preparar los datos para enviar al backend, asignando `null` a fechas vacías
    const cuentaData = {
      ...this.productForm.value,
      fecha_apertura_cuenta: this.productForm.value.fecha_apertura_cuenta || null,
      fecha_expiracion_cuenta: this.productForm.value.fecha_expiracion_cuenta || null
    };

    this.isLoading = true;

    if (this.isEditMode) {
      // Actualizar cuenta de ahorro existente
      this.productsService.updateCuentaAhorro(this.data.id_cuenta_ahorro, cuentaData).subscribe(
        () => {
          this.toastr.success('Cuenta de ahorro actualizada exitosamente', 'Éxito');
          this.isLoading = false;
          this.dialogRef.close(true);
        },
        () => {
          this.toastr.error('Error al actualizar la cuenta de ahorro', 'Error');
          this.isLoading = false;
        }
      );
    } else {
      // Crear una nueva cuenta de ahorro
      this.productsService.createCuentaAhorro(cuentaData).subscribe(
        () => {
          this.toastr.success('Cuenta de ahorro creada exitosamente', 'Éxito');
          this.isLoading = false;
          this.dialogRef.close(true);
        },
        () => {
          this.toastr.error('Error al crear la cuenta de ahorro', 'Error');
          this.isLoading = false;
        }
      );
    }
  }

  // Método para cerrar el diálogo sin guardar cambios
  onCancel(): void {
    this.dialogRef.close();
  }
}
