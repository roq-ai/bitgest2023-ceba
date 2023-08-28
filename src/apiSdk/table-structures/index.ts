import axios from 'axios';
import queryString from 'query-string';
import { TableStructureInterface, TableStructureGetQueryInterface } from 'interfaces/table-structure';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTableStructures = async (
  query?: TableStructureGetQueryInterface,
): Promise<PaginatedInterface<TableStructureInterface>> => {
  const response = await axios.get('/api/table-structures', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTableStructure = async (tableStructure: TableStructureInterface) => {
  const response = await axios.post('/api/table-structures', tableStructure);
  return response.data;
};

export const updateTableStructureById = async (id: string, tableStructure: TableStructureInterface) => {
  const response = await axios.put(`/api/table-structures/${id}`, tableStructure);
  return response.data;
};

export const getTableStructureById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/table-structures/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTableStructureById = async (id: string) => {
  const response = await axios.delete(`/api/table-structures/${id}`);
  return response.data;
};
