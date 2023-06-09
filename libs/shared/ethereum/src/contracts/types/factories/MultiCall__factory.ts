/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { MultiCall, MultiCallInterface } from "../MultiCall";

const _abi = [
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            name: "target",
            type: "address",
          },
          {
            name: "callData",
            type: "bytes",
          },
        ],
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate",
    outputs: [
      {
        name: "blockNumber",
        type: "uint256",
      },
      {
        name: "returnData",
        type: "bytes[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "addr",
        type: "address",
      },
    ],
    name: "getEthBalance",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
] as const;

export class MultiCall__factory {
  static readonly abi = _abi;
  static createInterface(): MultiCallInterface {
    return new utils.Interface(_abi) as MultiCallInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MultiCall {
    return new Contract(address, _abi, signerOrProvider) as MultiCall;
  }
}
