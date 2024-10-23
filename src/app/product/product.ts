export interface Product {
  id: string;
  price: number;
  name: string;
  description: string;
  categoryResponse: Category;
}

export interface ProductForm {
  id: string;
  price: number;
  name: string;
  description: string;
  category: number;
}

export interface Category {
  id: number;
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
  ASC = 'ASC',
  DESC = 'DESC',
}
