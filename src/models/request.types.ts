export type LoginBodyType = {
  email: string;
  password: string;
};

export type SignUpBodyType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  address_one: string;
  address_two: string;
  state: string;
  country: string;
  accept_terms: boolean;
};

export type PendingTaskBodyType = {
  id_user: number;
};
