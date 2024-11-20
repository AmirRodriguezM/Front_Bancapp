export interface Usuario {
    id: number; // ID del usuario
    nombre_usuario: string; // Nombre del usuario
    apellido_usuario: string; // Apellido del usuario
}

export interface CuentaAhorro {
    id_cuenta_ahorro: number | null;
    numero_cuenta: string;
    saldo_cuenta: number | string;
    fecha_apertura_cuenta: string;
    fecha_expiracion_cuenta?: string | null;
    codigo_verificacion_cuenta?: string | null;
    
    Usuario?: Usuario; // Ahora es opcional
}
