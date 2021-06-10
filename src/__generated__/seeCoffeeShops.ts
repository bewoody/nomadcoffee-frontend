/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShops
// ====================================================

export interface seeCoffeeShops_seeCoffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface seeCoffeeShops_seeCoffeeShops_categories {
  __typename: "Category";
  name: string;
}

export interface seeCoffeeShops_seeCoffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  photos: (seeCoffeeShops_seeCoffeeShops_photos | null)[] | null;
  categories: (seeCoffeeShops_seeCoffeeShops_categories | null)[] | null;
  isMine: boolean;
}

export interface seeCoffeeShops {
  seeCoffeeShops: (seeCoffeeShops_seeCoffeeShops | null)[] | null;
}
