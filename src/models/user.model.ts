// Define the Permission type for individual modules
export type Permission = {
  module: string; // The name of the module (e.g., "Sales", "Operations")
  access: number; // 1 for access, 0 for no access
  read: number; // 1 for read permission, 0 for no read permission
  write: number; // 1 for write permission, 0 for no write permission
};

export type UserModel = {
  name: string; // User's name
  email: string; // User's email
  uid: string; // User's unique identifier
  avatar: string; // User's avatar URL
};
