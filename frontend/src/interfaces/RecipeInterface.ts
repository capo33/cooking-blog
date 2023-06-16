export interface Owner {
  _id: string;
  name?: string;
  email?: string;
  avatar?: string;
  isAdmin?: boolean;
}

export interface Recipe {
  _id?: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
  cookingTime: number;
  category: string;
  owner: Owner;
}

export interface CreateRecipe {
  formData: Recipe;
  token: string;
}
