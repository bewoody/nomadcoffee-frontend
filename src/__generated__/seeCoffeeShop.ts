/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShop
// ====================================================

export interface seeCoffeeShop_seeCoffeeShop_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface seeCoffeeShop_seeCoffeeShop_categories {
  __typename: "Category";
  name: string;
}

export interface seeCoffeeShop_seeCoffeeShop {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  longitude: string | null;
  latitude: string | null;
  photos: (seeCoffeeShop_seeCoffeeShop_photos | null)[] | null;
  categories: (seeCoffeeShop_seeCoffeeShop_categories | null)[] | null;
}

export interface seeCoffeeShop {
  seeCoffeeShop: seeCoffeeShop_seeCoffeeShop | null;
}

export interface seeCoffeeShopVariables {
  id: number;
}
