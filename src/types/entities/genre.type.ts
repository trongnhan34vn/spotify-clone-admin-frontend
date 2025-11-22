export type Genre = {
  id: string;
  code: string;
  name: string;
  createdBy: string;
  status: GerneStatus;
  updatedBy: string;
  color: string;
};

export enum GerneStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type CreateGenre = Pick<Genre, 'name'>;

export type GenreFilterOption = {
  name: string[];
  code: string[];
  status: string[];
  color: string[];
  createdBy: string[];
};
