import { user } from './user';

export interface AdminPermiso {
    id_admin_permiso: number;
    tipo_permiso: string;
    usuarios: user[];
}