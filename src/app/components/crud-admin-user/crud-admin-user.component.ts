import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserAdminServicesService } from '../../services/user.admin.services.service';
import { AgregarEditarClientUsuarioComponent } from '../agregar-editar-client-usuario/agregar-editar-client-usuario.component';
import { EditarClientUsuarioComponent } from '../editar-client-usuario/editar-client-usuario.component';

@Component({
  selector: 'app-crud-admin-user',
  templateUrl: './crud-admin-user.component.html',
  styleUrls: ['./crud-admin-user.component.css']
})
export class CrudAdminUserComponent implements OnInit, AfterViewInit {

  loading: boolean = false;
  displayedColumns: string[] = [
    'id',
    'nombre_usuario',
    'apellido_usuario',
    'nombre_ingreso_usuario',
    'clave_ingreso_usuario',
    'estado_usuario',
    'id_rol',
    'id_cuenta_ahorro',
    'acciones'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userAdminServicesService: UserAdminServicesService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  // Método para cargar solo clientes
  loadClientes() {
    this.loading = true;
    this.userAdminServicesService.getClientes().subscribe({
      next: (response: any[]) => {
        this.loading = false;
        this.dataSource.data = response;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al obtener clientes:', err);
        this.toastr.error('Error al cargar los datos', 'Error');
      }
    });
  }

  // Método para aplicar filtros en la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Método para abrir el modal solo en modo creación de usuario
  createUsuarioUser() {
    const dialogRef = this.dialog.open(AgregarEditarClientUsuarioComponent, {
      width: '550px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTableData(result, false); 
        this.toastr.success('Cliente creado con éxito', 'Éxito');
      }
    });
  }

  // Método para abrir el modal en modo edición de usuario
  editUsuarioUser(element: any) {
    const dialogRef = this.dialog.open(EditarClientUsuarioComponent, {
      width: '550px',
      data: element 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        // Si se actualizó correctamente, refrescamos los datos en la tabla
        this.updateTableData(result, true); 
      }
    });
  }

  // Método auxiliar para actualizar o agregar datos en la tabla
  private updateTableData(result: any, isEditMode: boolean) {
    if (!result) return;

    const index = this.dataSource.data.findIndex(item => item.id === result.id);
    if (isEditMode && index !== -1) {
      // Actualiza el usuario existente
      this.dataSource.data[index] = result;
    } else if (!isEditMode) {
      // Agrega un nuevo usuario a la tabla
      this.dataSource.data = [...this.dataSource.data, result];
    }
    this.dataSource._updateChangeSubscription();
  }

  // Método para eliminar un cliente
  deleteUsuarioClient(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.userAdminServicesService.deleteUserClient(id).subscribe({
        next: (response) => {
          this.toastr.success(response.message, 'Cliente eliminado');
          this.dataSource.data = this.dataSource.data.filter(client => client.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar cliente:', err);
          this.toastr.error('Error al eliminar cliente', 'Error');
        }
      });
    }
  }
}
