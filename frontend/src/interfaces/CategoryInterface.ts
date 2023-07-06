export interface Category {
  name: string;
  image: string;
  slug?: string;
  recipes?: string[];
  _id?: string;
}

export interface ICategoryData {
  name: string;
  image: string;
}
