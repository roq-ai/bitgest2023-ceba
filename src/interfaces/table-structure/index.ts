import { FormInterface } from 'interfaces/form';
import { DatabaseConnectionInterface } from 'interfaces/database-connection';
import { GetQueryInterface } from 'interfaces';

export interface TableStructureInterface {
  id?: string;
  table_name: string;
  field_name: string;
  field_type: string;
  is_nullable: boolean;
  default_value?: string;
  database_connection_id: string;
  created_at?: any;
  updated_at?: any;
  form?: FormInterface[];
  database_connection?: DatabaseConnectionInterface;
  _count?: {
    form?: number;
  };
}

export interface TableStructureGetQueryInterface extends GetQueryInterface {
  id?: string;
  table_name?: string;
  field_name?: string;
  field_type?: string;
  default_value?: string;
  database_connection_id?: string;
}
