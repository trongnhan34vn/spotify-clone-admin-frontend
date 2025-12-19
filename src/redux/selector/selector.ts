import type { RootState } from "../store";

export const authSelector = (state: RootState) => state.auth;
export const userSelector = (state: RootState) => state.user;
export const groupSelector = (state: RootState) => state.group;

// selector by feature
export const createUserSelector = (state: RootState) => state.user.create;

export const listGenreSelector = (state: RootState) => state.genre.list;
export const detailGenreSelector = (state: RootState) => state.genre.detail;
export const createGenreSelector = (state: RootState) => state.genre.create;
export const listGenreFilterOptionsSelector = (state: RootState) => state.genre.listFilterOption;
export const updateGenreSelector = (state: RootState) => state.genre.update;
export const deleteGenreSelector = (state: RootState) => state.genre.delete;

export const listGroupSelector = (state: RootState) => state.group.list;