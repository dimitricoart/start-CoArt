import { id, ZeroHash } from "ethers";

export const baseTokenURI = "ar://";
export const tokenId = 1337n;
export const amount = 100000n;

export enum InterfaceId {
  // OZ
  IERC165 = "0x01ffc9a7",
  IERC20 = "0x36372b07",
  IERC20Metadata = "0xa219a025",
  IERC721 = "0x80ac58cd",
  IERC721Metadata = "0x5b5e139f",
  IERC721Enumerable = "0x780e9d63",
  IERC721Receiver = "0x150b7a02",
  IERC1155 = "0xd9b67a26",
  IERC1155Metadata = "0x0e89341c", // IERC1155MetadataURI
  IERC1155Receiver = "0x4e2312e0",
  IRoyalty = "0x2a55205a", // IERC2981
  IAccessControl = "0x7965db0b",
  IAccessControlEnumerable = "0x5a05180f",
  IAccessControlDefaultAdminRules = "0x31498786",
  IGovernor = "0x65455a86",
  IVotes = "0xe90fb3f6",
  Invalid = "0xffffffff",
  IERC1363 = "0xb0202a11",
  IERC1363Receiver = "0x88a7ca5c",
  IERC1363Spender = "0x7b04a2d0",
  IERC4906 = "0x49064906", // OpenSea metadata
  IERC4907 = "0xad092b5c", // rent
  IERC5267 = "0x84b0196e", // EIP 712 domain
  IERC6372 = "0xda287a1d", // governance
}

export const MINTER_ROLE = id("MINTER_ROLE");
export const PAUSER_ROLE = id("PAUSER_ROLE");
export const METADATA_ROLE = id("METADATA_ROLE");
export const DEFAULT_TEST_ROLE = id("DEFAULT_TEST_ROLE");
export const DEFAULT_ADMIN_ROLE = ZeroHash;
