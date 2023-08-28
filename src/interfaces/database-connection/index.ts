import { TableStructureInterface } from 'interfaces/table-structure';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface DatabaseConnectionInterface {
  id?: string;
  host: string;
  port: number;
  database_name: string;
  username: string;
  password: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  table_structure?: TableStructureInterface[];
  company?: CompanyInterface;
  _count?: {
    table_structure?: number;
  };
}

export interface DatabaseConnectionGetQueryInterface extends GetQueryInterface {
  id?: string;
  host?: string;
  database_name?: string;
  username?: string;
  password?: string;
  company_id?: string;
}
