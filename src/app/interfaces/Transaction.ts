export interface Transaction {
    id_transaccion: number;
    id_cuenta_ahorro: number;
    tipo_transaccion: string;
    monto: number;
    fecha_transaccion: string;
    descripcion: string | null;
  }