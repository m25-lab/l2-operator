/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface MultiActionInterface extends utils.Interface {
  functions: {
    "_multiTransfer(address,address[],uint256[])": FunctionFragment;
    "addOwner(address)": FunctionFragment;
    "iam()": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "isInWhitelist(address)": FunctionFragment;
    "isOwner(address)": FunctionFragment;
    "masterOwner()": FunctionFragment;
    "multiMinter(address,address[],uint256[])": FunctionFragment;
    "multiTransfer(address,address[],uint256[])": FunctionFragment;
    "multiTransferNote(address,address[],uint256[],string)": FunctionFragment;
    "ownerByIndex(uint256)": FunctionFragment;
    "removeOwner(address)": FunctionFragment;
    "renounceMasterOwnership()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "totalOwner()": FunctionFragment;
    "transferMasterOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_multiTransfer"
      | "addOwner"
      | "iam"
      | "initialize"
      | "isInWhitelist"
      | "isOwner"
      | "masterOwner"
      | "multiMinter"
      | "multiTransfer"
      | "multiTransferNote"
      | "ownerByIndex"
      | "removeOwner"
      | "renounceMasterOwnership"
      | "renounceOwnership"
      | "totalOwner"
      | "transferMasterOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_multiTransfer",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "addOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "iam", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isInWhitelist",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "masterOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "multiMinter",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "multiTransfer",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "multiTransferNote",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "ownerByIndex",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceMasterOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferMasterOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "_multiTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "iam", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isInWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "masterOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "multiMinter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "multiTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "multiTransferNote",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ownerByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceMasterOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferMasterOwnership",
    data: BytesLike
  ): Result;

  events: {
    "Initialized(uint8)": EventFragment;
    "MasterOwnershipTransferred(address,address)": EventFragment;
    "Mint(address,address,uint256)": EventFragment;
    "RenounceMasterOwnership(address)": EventFragment;
    "RenounceOwnership(address)": EventFragment;
    "RevokeOwner(address)": EventFragment;
    "SetOwner(address)": EventFragment;
    "Transfer(address,address,address,uint256)": EventFragment;
    "TransferNote(string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MasterOwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Mint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RenounceMasterOwnership"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RenounceOwnership"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RevokeOwner"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetOwner"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferNote"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface MasterOwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type MasterOwnershipTransferredEvent = TypedEvent<
  [string, string],
  MasterOwnershipTransferredEventObject
>;

export type MasterOwnershipTransferredEventFilter =
  TypedEventFilter<MasterOwnershipTransferredEvent>;

export interface MintEventObject {
  token: string;
  to: string;
  amount: BigNumber;
}
export type MintEvent = TypedEvent<
  [string, string, BigNumber],
  MintEventObject
>;

export type MintEventFilter = TypedEventFilter<MintEvent>;

export interface RenounceMasterOwnershipEventObject {
  owner: string;
}
export type RenounceMasterOwnershipEvent = TypedEvent<
  [string],
  RenounceMasterOwnershipEventObject
>;

export type RenounceMasterOwnershipEventFilter =
  TypedEventFilter<RenounceMasterOwnershipEvent>;

export interface RenounceOwnershipEventObject {
  owner: string;
}
export type RenounceOwnershipEvent = TypedEvent<
  [string],
  RenounceOwnershipEventObject
>;

export type RenounceOwnershipEventFilter =
  TypedEventFilter<RenounceOwnershipEvent>;

export interface RevokeOwnerEventObject {
  owner: string;
}
export type RevokeOwnerEvent = TypedEvent<[string], RevokeOwnerEventObject>;

export type RevokeOwnerEventFilter = TypedEventFilter<RevokeOwnerEvent>;

export interface SetOwnerEventObject {
  newOwner: string;
}
export type SetOwnerEvent = TypedEvent<[string], SetOwnerEventObject>;

export type SetOwnerEventFilter = TypedEventFilter<SetOwnerEvent>;

export interface TransferEventObject {
  token: string;
  from: string;
  to: string;
  amount: BigNumber;
}
export type TransferEvent = TypedEvent<
  [string, string, string, BigNumber],
  TransferEventObject
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface TransferNoteEventObject {
  note: string;
}
export type TransferNoteEvent = TypedEvent<[string], TransferNoteEventObject>;

export type TransferNoteEventFilter = TypedEventFilter<TransferNoteEvent>;

export interface MultiAction extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MultiActionInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    _multiTransfer(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    iam(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      _iam: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isInWhitelist(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isOwner(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    masterOwner(overrides?: CallOverrides): Promise<[string]>;

    multiMinter(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    multiTransfer(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    multiTransferNote(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      _note: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    ownerByIndex(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    removeOwner(
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceMasterOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    totalOwner(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferMasterOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  _multiTransfer(
    token: PromiseOrValue<string>,
    _addresses: PromiseOrValue<string>[],
    _amounts: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addOwner(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  iam(overrides?: CallOverrides): Promise<string>;

  initialize(
    _iam: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isInWhitelist(
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isOwner(
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  masterOwner(overrides?: CallOverrides): Promise<string>;

  multiMinter(
    token: PromiseOrValue<string>,
    _addresses: PromiseOrValue<string>[],
    _amounts: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  multiTransfer(
    token: PromiseOrValue<string>,
    _addresses: PromiseOrValue<string>[],
    _amounts: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  multiTransferNote(
    token: PromiseOrValue<string>,
    _addresses: PromiseOrValue<string>[],
    _amounts: PromiseOrValue<BigNumberish>[],
    _note: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  ownerByIndex(
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  removeOwner(
    owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceMasterOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  totalOwner(overrides?: CallOverrides): Promise<BigNumber>;

  transferMasterOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    _multiTransfer(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    addOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    iam(overrides?: CallOverrides): Promise<string>;

    initialize(
      _iam: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    isInWhitelist(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isOwner(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    masterOwner(overrides?: CallOverrides): Promise<string>;

    multiMinter(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    multiTransfer(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    multiTransferNote(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      _note: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    ownerByIndex(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    removeOwner(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceMasterOwnership(overrides?: CallOverrides): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    totalOwner(overrides?: CallOverrides): Promise<BigNumber>;

    transferMasterOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "MasterOwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): MasterOwnershipTransferredEventFilter;
    MasterOwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): MasterOwnershipTransferredEventFilter;

    "Mint(address,address,uint256)"(
      token?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      amount?: null
    ): MintEventFilter;
    Mint(
      token?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      amount?: null
    ): MintEventFilter;

    "RenounceMasterOwnership(address)"(
      owner?: PromiseOrValue<string> | null
    ): RenounceMasterOwnershipEventFilter;
    RenounceMasterOwnership(
      owner?: PromiseOrValue<string> | null
    ): RenounceMasterOwnershipEventFilter;

    "RenounceOwnership(address)"(
      owner?: PromiseOrValue<string> | null
    ): RenounceOwnershipEventFilter;
    RenounceOwnership(
      owner?: PromiseOrValue<string> | null
    ): RenounceOwnershipEventFilter;

    "RevokeOwner(address)"(
      owner?: PromiseOrValue<string> | null
    ): RevokeOwnerEventFilter;
    RevokeOwner(owner?: PromiseOrValue<string> | null): RevokeOwnerEventFilter;

    "SetOwner(address)"(
      newOwner?: PromiseOrValue<string> | null
    ): SetOwnerEventFilter;
    SetOwner(newOwner?: PromiseOrValue<string> | null): SetOwnerEventFilter;

    "Transfer(address,address,address,uint256)"(
      token?: PromiseOrValue<string> | null,
      from?: null,
      to?: null,
      amount?: null
    ): TransferEventFilter;
    Transfer(
      token?: PromiseOrValue<string> | null,
      from?: null,
      to?: null,
      amount?: null
    ): TransferEventFilter;

    "TransferNote(string)"(note?: null): TransferNoteEventFilter;
    TransferNote(note?: null): TransferNoteEventFilter;
  };

  estimateGas: {
    _multiTransfer(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    iam(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _iam: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isInWhitelist(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isOwner(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    masterOwner(overrides?: CallOverrides): Promise<BigNumber>;

    multiMinter(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    multiTransfer(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    multiTransferNote(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      _note: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    ownerByIndex(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeOwner(
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceMasterOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    totalOwner(overrides?: CallOverrides): Promise<BigNumber>;

    transferMasterOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _multiTransfer(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    iam(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _iam: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isInWhitelist(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isOwner(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    masterOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    multiMinter(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    multiTransfer(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    multiTransferNote(
      token: PromiseOrValue<string>,
      _addresses: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      _note: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    ownerByIndex(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeOwner(
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceMasterOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    totalOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferMasterOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
