export interface Owner {
  _id: string;
  name?: string;
  email?: string;
  avatar?: string;
  isAdmin?: boolean;
}

export interface Category {
  _id?: string;
  name: string;
  slug: string;
}


export interface Recipe {
  _id?: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
  cookingTime: number;
  category: Category;
  owner: Owner;
}

export interface CreateRecipe {
  formData: Recipe;
  token: string;
}
