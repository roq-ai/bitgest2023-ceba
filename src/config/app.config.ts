interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: ['Customer'],
  tenantRoles: ['Administrator', 'Database Manager'],
  tenantName: 'Company',
  applicationName: 'BitGest2023',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
