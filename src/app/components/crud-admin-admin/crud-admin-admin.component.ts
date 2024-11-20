import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminPermiso } from '../../interfaces/useradmin';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AgregarEditarAdminUsuarioComponent } from '../agregar-editar-admin-usuario/agregar-editar-admin-usuario.component';
import { UserAdminServicesService } from '../../services/user.admin.services.service';

@Component({
  selector: 'app-crud-admin-admin',
  templateUrl: './crud-admin-admin.component.html',
  styleUrls: ['./crud-admin-admin.component.css']
})
export class CrudAdminAdminComponent implements OnInit, AfterViewInit {

  loading: boolean = false;
  displayedColumns: string[] = [
    'id_usuario',
    'nombre_usuario',     
    'apellido_usuario', 
    'nombre_ingreso_usuario', 
    'clave_ingreso_usuario',
    'estado_usuario', 
    'id_rol',
    'id_admin_permiso', 
    'tipo_permiso',      
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
    this.loadPermisosUsuarios();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  loadPermisosUsuarios() {
    this.loading = true;
    this.userAdminServicesService.getPermisosUsuarios().subscribe({
      next: (response: AdminPermiso[]) => {
        this.loading = false;
        // Filtrar solo usuarios con rol de administrador
        const adminData = this.flattenData(response).filter(user => user.id_rol === 2); 
        this.dataSource.data = adminData;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al obtener permisos y usuarios:', err);
      }
    });
  }

  private flattenData(response: any): any[] {
    const result = [];
    if (response && response.length) {
      for (const permiso of response) {
        const usuarios = permiso.Usuarios;
        const tipoPermiso = permiso.tipo_permiso;

        for (const usuario of usuarios) {
          result.push({
            id_usuario: usuario.id,
            id_admin_permiso: permiso.id_admin_permiso,
            tipo_permiso: tipoPermiso,
            nombre_ingreso_usuario: usuario.nombre_ingreso_usuario,
            nombre_usuario: usuario.nombre_usuario,
            apellido_usuario: usuario.apellido_usuario,
            clave_ingreso_usuario: usuario.clave_ingreso_usuario || '',
            estado_usuario: usuario.estado_usuario,
            id_rol: usuario.id_rol,
          });
        }
      }
    }
    return result;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addEditUsuarioAdmin(element?: any) {
    const dialogRef = this.dialog.open(AgregarEditarAdminUsuarioComponent, {
      width: '550px',
      data: element || {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.map(user => user.id_usuario === result.id_usuario ? result : user);
      }
    });
  }

  editUsuarioAdmin(element: any) {
    this.addEditUsuarioAdmin(element);
  }

  deleteUsuarioAdmin(element: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.loading = true;
      this.userAdminServicesService.deleteUser(element.id_usuario).subscribe({
        next: (response: { success: boolean; message: string }) => {
          this.loading = false;
          if (response.success) {
            this.dataSource.data = this.dataSource.data.filter(user => user.id_usuario !== element.id_usuario);
            this.toastr.success('Usuario eliminado exitosamente', 'Éxito');
          } else {
            this.toastr.error('No se pudo eliminar el usuario', 'Error');
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('Error al eliminar el usuario:', err);
          this.toastr.error('Error al eliminar el usuario', 'Error');
        }
      });
    }
  }
}
