import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ProductsServicesService } from '../../services/products.services.service';
import { CuentaAhorro } from '../../interfaces/CuentaAhorro';
import { AgregarEditarProductosComponent } from '../agregar-editar-productos/agregar-editar-productos.component';

@Component({
  selector: 'app-crud-admin-product',
  templateUrl: './crud-admin-product.component.html',
  styleUrls: ['./crud-admin-product.component.css']
})
export class CrudAdminProductComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  displayedColumns: string[] = [
    'id_cuenta_ahorro',
    'Usuario.id',
    'Usuario.nombre_usuario',
    'Usuario.apellido_usuario',
    'numero_cuenta',
    'saldo_cuenta',
    'fecha_apertura_cuenta',
    'fecha_expiracion_cuenta',
    'codigo_verificacion_cuenta',
    'acciones'
  ];
  dataSource = new MatTableDataSource<CuentaAhorro>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productsService: ProductsServicesService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCuentasAhorro();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  // Método para abrir el diálogo de agregar/editar producto
  addEditProductAdmin(element?: CuentaAhorro) {
    const dialogRef = this.dialog.open(AgregarEditarProductosComponent, {
      width: '550px',
      data: element || {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCuentasAhorro(); 
      }
    });
  }

  // Método para cargar todas las cuentas de ahorro
  loadCuentasAhorro() {
    this.loading = true;
    this.productsService.obtenerCuentasAhorro().subscribe({
      next: (response: CuentaAhorro[]) => {
        this.loading = false;
        this.dataSource.data = response;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al obtener cuentas de ahorro:', err);
        this.toastr.error('Error al obtener cuentas de ahorro', 'Error');
      }
    });
  }

  // Método para eliminar una cuenta de ahorro
  deleteCuentaAhorro(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta cuenta de ahorro?')) {
      this.productsService.eliminarCuentaAhorro(id).subscribe({
        next: () => {
          this.toastr.success('Cuenta de ahorro eliminada con éxito', 'Eliminación exitosa');
          this.loadCuentasAhorro(); 
        },
        error: (err) => {
          console.error('Error al eliminar la cuenta de ahorro:', err);
          this.toastr.error('Error al eliminar la cuenta de ahorro', 'Error');
        }
      });
    }
  }

  // Método para aplicar el filtro en la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
