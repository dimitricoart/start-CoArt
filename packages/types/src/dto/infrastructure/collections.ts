export interface IIdBase {
  id: number;
}

export interface IIdDateBase extends IIdBase {
  createdAt: string;
  updatedAt: string;
}

export interface IUuidBase {
  id: string;
}

export interface IUuidDateBase extends IUuidBase {
  createdAt: string;
  updatedAt: string;
}

export interface IDateBase {
  createdAt: string;
  updatedAt: string;
}

export interface ISearchable {
  title: string;
  description: string;
}

export interface ISearchableDto {
  title: string;
  description: string;
}

export interface IPaginationDto {
  skip: number;
  take: number;
}

export interface IPaginationResult<T> {
  data: T[];
  total: number;
}

export interface ISearchDto extends IPaginationDto {
  sortOrder?: "ASC" | "DESC";
  sortField?: string;
}
