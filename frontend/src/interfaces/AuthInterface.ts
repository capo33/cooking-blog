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
    birthday?: Date;
    interests?: string[];
    _id?: string;
    image?: string;
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

export interface IUpdateProfile {
  result: {
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
    birthday?:  Date;
    about?: string;
    image?: string;
    interests?: string[];
  };
}
