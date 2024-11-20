import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserViewProductService } from './../../services/user.view.product.service';
import { CuentaAhorro } from './../../interfaces/CuentaAhorro';
import { MontoDialogComponent } from '../../components/monto-dialog-component/monto-dialog-component.component';
import { jwtDecode } from 'jwt-decode';
import { TransaccionUserComponent } from '../../components/transaccion-user/transaccion-user.component';
import { Transfer } from '../../interfaces/transfer'; // Importa la interfaz Transfer

@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html',
  styleUrls: ['./account-user.component.css']
})
export class AccountUserComponent implements OnInit {
  nombreCompleto: string = '';
  cuentaAhorro: CuentaAhorro | null = null;
  fechaVencimiento: string = '';
  numeroCuentaFormateado: string = '';

  constructor(
    private userViewProductService: UserViewProductService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerNombreCompleto();
    this.obtenerCuentaAhorro();
  }

  // Método para abrir el diálogo de transferencia
  generarTransaccion(): void {
    const dialogRef = this.dialog.open(TransaccionUserComponent, {
      width: '400px',
      data: { operacion: 'Transferencia' }
    });

    dialogRef.afterClosed().subscribe((result: Transfer | undefined) => {
      if (result) {
        this.userViewProductService.realizarTransferencia(result.monto, result.numero_cuenta_destino, result.codigo_verificacion)
          .subscribe({
            next: (response) => {
              this.toastr.success(response.message || 'Transferencia realizada exitosamente', 'Éxito');
              this.obtenerCuentaAhorro(); // Actualizar saldo después de la transferencia
            },
            error: (err) => {
              // Verificar el codigo_error del backend y mostrar el mensaje correspondiente
              if (err.error && err.error.codigo_error) {
                switch (err.error.codigo_error) {
                  case 1001:
                    this.toastr.error("El monto debe ser positivo", "Error de transferencia");
                    break;
                  case 1002:
                    this.toastr.error("Usuario o cuenta de ahorro no encontrados", "Error de transferencia");
                    break;
                  case 1003:
                    this.toastr.error("Saldo insuficiente para realizar la transferencia", "Error de transferencia");
                    break;
                  case 1004:
                    this.toastr.error("No puede transferir dinero a la misma cuenta", "Error de transferencia");
                    break;
                  case 1005:
                    this.toastr.error("Error interno del servidor", "Error");
                    break;
                  case 1006:
                    this.toastr.error("Código de verificación incorrecto", "Error de transferencia");
                    break;
                  default:
                    this.toastr.error("Error desconocido en la transferencia", "Error");
                }
              } else {
                this.toastr.error("Error al realizar la transferencia", "Error");
              }
            }
          });
      }
    });
  }

  // Obtener nombre completo del usuario desde el token
  obtenerNombreCompleto(): void {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const nombre = decoded.nombre_usuario || '';
        const apellido = decoded.apellido_usuario || '';
        this.nombreCompleto = `${nombre} ${apellido}`;
      } catch (error) {
        console.error('Error decodificando el token:', error);
      }
    } else {
      console.error('No se encontró el token en localStorage.');
    }
  }

  // Obtener la cuenta de ahorro del usuario
  obtenerCuentaAhorro(): void {
    this.userViewProductService.getCuentaAhorro().subscribe(
      (data) => {
        this.cuentaAhorro = data;
        this.formatearFechaVencimiento(data.fecha_expiracion_cuenta);
        this.formatearNumeroCuenta(data.numero_cuenta);
      },
      (error) => {
        console.error('Error al obtener los datos de la cuenta:', error);
      }
    );
  }

  // Formatear la fecha de vencimiento de la cuenta
  formatearFechaVencimiento(fecha: string | undefined | null): void {
    if (fecha) {
      const fechaObj = new Date(fecha);
      const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
      const año = fechaObj.getFullYear().toString().slice(-2);
      this.fechaVencimiento = `${mes}/${año}`;
    } else {
      this.fechaVencimiento = '';
    }
  }

  // Formatear el número de cuenta en bloques de 4 dígitos
  formatearNumeroCuenta(numero: string): void {
    this.numeroCuentaFormateado = numero.replace(/\d{4}(?=.)/g, '$& ');
  }

  // Abrir diálogo para agregar saldo
  agregarSaldo(): void {
    const dialogRef = this.dialog.open(MontoDialogComponent, {
      data: { operacion: 'Deposito' }
    });

    dialogRef.afterClosed().subscribe((monto: number | undefined) => {
      if (monto) {
        this.userViewProductService.realizarDeposito(monto).subscribe({
          next: (response) => {
            this.toastr.success(response.message || 'Depósito realizado exitosamente', 'Éxito');
            this.obtenerCuentaAhorro();
          },
          error: () => {
            this.toastr.error('Error al realizar el depósito', 'Error');
          }
        });
      }
    });
  }

  // Abrir diálogo para retirar saldo
  retirarSaldo(): void {
    const dialogRef = this.dialog.open(MontoDialogComponent, {
      data: { operacion: 'Retiro' }
    });

    dialogRef.afterClosed().subscribe((monto: number | undefined) => {
      if (monto) {
        this.userViewProductService.realizarRetiro(monto).subscribe({
          next: (response) => {
            this.toastr.success(response.message || 'Retiro realizado exitosamente', 'Éxito');
            this.obtenerCuentaAhorro();
          },
          error: () => {
            this.toastr.error('Error al realizar el retiro', 'Error');
          }
        });
      }
    });
  }
}