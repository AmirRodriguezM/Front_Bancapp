import { UsuarioRol } from "./UsuarioRol";

export interface user {
    id: number | null;
    nombre_usuario: string;
    apellido_usuario: string;
    nombre_ingreso_usuario: string;
    clave_ingreso_usuario: string;
    estado_usuario: string;
    id_rol: number | null;
    id_admin_permiso?: number | null;
    id_cuenta_ahorro?: number | null;
    UsuarioRol?: UsuarioRol | null;
}