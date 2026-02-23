export interface IOfferCreateDto {
  assetId: string;
  /** From API as string; form may use number */
  fractions: string | number | bigint;
  price: number;
}
