export type Genre = {
  id: string;
  code: string;
  name: string;
  description: string;
  status: GenreStatus;
  color: string;
  image: string;
  createdAt: string;
  updatedBy: string;
  createdBy: string;
};

export enum GenreStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type CreateGenre = Pick<Genre, 'name'>;

export type GenreFilterOption = {
  name: string[];
  code: string[];
  status: string[];
  color: string[];
};
