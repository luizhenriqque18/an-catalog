export interface Product {
  id: string;
  price: number;
  name: string;
  description: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
}

export interface Response<T> {
  data: T;
  pagination: Page;
}

export interface Page {
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface PageOption {
  page: number;
  size: number;
  sort: string;
  direction: Direction;
}

export enum Direction {
  ASC,
  DESC,
}
