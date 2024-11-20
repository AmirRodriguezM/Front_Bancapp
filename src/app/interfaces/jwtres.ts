export interface JwtRes {
    success: boolean;
    message: string;
    token: string;
    userType: string;
    _id: number;
    nombre_usuario: string;
    apellido_usuario: string;
    nombre_ingreso_usuario: string;
    estado_usuario: string;
    id_rol: number;
    id_admin_permiso?: number;
    iat: number; 
    exp: number; 
}
