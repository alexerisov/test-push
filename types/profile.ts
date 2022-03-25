interface BaseProfile {
  pk: number;
  full_name: string | null;
  phone_number: string | null;
  email: string | null;
  avatar: URL | null;
  city: string | null;
  language: string | null;
  addresses: UserAddress[];
}

export interface UserAddress {
  pk: number;
  city: string;
  street: string;
  house: string;
  flat: string | null;
  zipcode: string;
}

export enum USER_TYPES {
  VIEWER = 0,
  CHEF = 1
}

export interface ChefProfile extends BaseProfile {
  user_type: USER_TYPES.CHEF;
  username: string | null;
  bio: string | null;
  cooking_philosophy: string[] | null;
  personal_cooking_mission: string[] | null;
  source_of_inspiration: string[] | null;
  addresses: UserAddress[] | null;
  role_models: any[] | null;
  favorite_recipes: any[] | null;
  experience: any[] | null;
}

export interface ViewerProfile extends BaseProfile {
  user_type: USER_TYPES.VIEWER;
}
