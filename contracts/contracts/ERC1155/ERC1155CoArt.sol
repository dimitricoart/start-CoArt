// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC1155Burnable} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import {ERC1155Supply} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import {ERC1155URIStorage} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract ERC1155CoArt is ERC1155, ERC1155Burnable, ERC1155Supply, ERC1155URIStorage, AccessControl {
    error ERC1155ExceededCap(uint256 increasedSupply, uint256 cap, uint256 tokenId);
    error ERC1155MetadataNotSet(uint256 tokenId);

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory baseTokenURI) ERC1155(baseTokenURI) {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(MINTER_ROLE, _msgSender());
        _setBaseURI(baseTokenURI);
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data) public virtual onlyRole(MINTER_ROLE) {
        _mint(to, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual onlyRole(MINTER_ROLE) {
        _mintBatch(to, ids, amounts, data);
    }

    function setTokenURI(uint256 tokenId, string calldata txId) public onlyRole(MINTER_ROLE) {
        _setURI(tokenId, txId);
    }

    function setURI(string memory newURI) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setURI(newURI);
    }

    function setBaseURI(string memory baseURI) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setBaseURI(baseURI);
    }

    function uri(uint256 tokenId) public view virtual override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return super.uri(tokenId);
    }

    function _update(address from, address to, uint256[] memory ids, uint256[] memory amounts) internal virtual override (ERC1155, ERC1155Supply) {
        if (from == address(0)) {
            for (uint256 i = 0; i < ids.length;) {
                if (totalSupply(ids[i]) != 0) {
                    revert ERC1155ExceededCap(totalSupply(ids[i]) + amounts[i], totalSupply(ids[i]), ids[i]);
                }
                unchecked {
                    i++;
                }
            }
        }

        super._update(from, to, ids, amounts);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControl, ERC1155) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
