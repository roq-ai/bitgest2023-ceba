import { CustomerInterface } from 'interfaces/customer';
import { DatabaseConnectionInterface } from 'interfaces/database-connection';
import { FormInterface } from 'interfaces/form';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  customer?: CustomerInterface[];
  database_connection?: DatabaseConnectionInterface[];
  form?: FormInterface[];
  user?: UserInterface;
  _count?: {
    customer?: number;
    database_connection?: number;
    form?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
