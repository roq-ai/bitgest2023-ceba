import axios from 'axios';
import queryString from 'query-string';
import { DatabaseConnectionInterface, DatabaseConnectionGetQueryInterface } from 'interfaces/database-connection';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDatabaseConnections = async (
  query?: DatabaseConnectionGetQueryInterface,
): Promise<PaginatedInterface<DatabaseConnectionInterface>> => {
  const response = await axios.get('/api/database-connections', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDatabaseConnection = async (databaseConnection: DatabaseConnectionInterface) => {
  const response = await axios.post('/api/database-connections', databaseConnection);
  return response.data;
};

export const updateDatabaseConnectionById = async (id: string, databaseConnection: DatabaseConnectionInterface) => {
  const response = await axios.put(`/api/database-connections/${id}`, databaseConnection);
  return response.data;
};

export const getDatabaseConnectionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/database-connections/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDatabaseConnectionById = async (id: string) => {
  const response = await axios.delete(`/api/database-connections/${id}`);
  return response.data;
};
