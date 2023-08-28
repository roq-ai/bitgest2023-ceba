import { TableStructureInterface } from 'interfaces/table-structure';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface FormInterface {
  id?: string;
  form_type: string;
  table_structure_id: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;

  table_structure?: TableStructureInterface;
  company?: CompanyInterface;
  _count?: {};
}

export interface FormGetQueryInterface extends GetQueryInterface {
  id?: string;
  form_type?: string;
  table_structure_id?: string;
  company_id?: string;
}
