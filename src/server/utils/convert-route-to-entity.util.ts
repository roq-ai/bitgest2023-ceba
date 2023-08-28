const mapping: Record<string, string> = {
  companies: 'company',
  customers: 'customer',
  'database-connections': 'database_connection',
  forms: 'form',
  'table-structures': 'table_structure',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
