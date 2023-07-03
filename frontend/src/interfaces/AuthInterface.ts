export interface User {
  result: {
    message: string;
    token: string;
    name: string;
    email: string;
    password: string;
    answer?: string;
    about?: string;
    isAdmin?: boolean;
    phone?: string;
    address?: string;
    savedRecipes?: string[];
    birthday?: string;
    interests?: string[];
    _id?: string;
    avatar?: string;
    createdAt?: number;
    updatedAt?: number;
  };
  token: string;
}

export interface AuthUser {
  email: string;
  password: string;
  name?: string;
}

export interface Auth {
  formData: AuthUser;
  navigate: any;
  toast?: any;
}
