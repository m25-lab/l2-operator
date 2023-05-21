import { utils } from 'ethers'

import {
  AccountManagement__factory,
  BERC20__factory,
  BooPrivate__factory,
  BridgeConverter__factory,
  BToken__factory,
  ERC20__factory,
  MasterOwners__factory,
  MinterMultiple__factory,
} from './types'

const { FormatTypes } = utils

const BooInterface = BooPrivate__factory.createInterface()
const ERC20Interface = ERC20__factory.createInterface()
const BERC20Interface = BERC20__factory.createInterface()
const BTokenInterface = BToken__factory.createInterface()
const BridgeInterface = BridgeConverter__factory.createInterface()
const MultiSigInterface = MasterOwners__factory.createInterface()
const MinterMultipleInterface = MinterMultiple__factory.createInterface()
const AccountManagementInterface = AccountManagement__factory.createInterface()

export const Contract = {
  name: {
    BooToken: 'BooToken',
    BridgeConverter: 'BridgeConverter',
    ERC20: 'ERC20',
    BERC20: 'BERC20',
    BToken: 'BToken',
    BooUSD: 'BooUSD',
  },

  interface: {
    BooInterface,
    ERC20Interface,
    BERC20Interface,
    BTokenInterface,
    MultiSigInterface,
    MinterMultipleInterface,
    AccountManagementInterface,
    BridgeInterface,
  },

  MethodSignature: {
    ERC20: {
      Transfer: ERC20Interface.getFunction('transfer').format(
        FormatTypes.sighash,
      ),
      TransferFrom: ERC20Interface.getFunction('transferFrom').format(
        FormatTypes.sighash,
      ),
      Approve: ERC20Interface.getFunction('approve').format(
        FormatTypes.sighash,
      ),

      Burn: BTokenInterface.getFunction('burn').format(FormatTypes.sighash),
      Mint: BTokenInterface.getFunction('mint').format(FormatTypes.sighash),
    },

    DOO: {
      AddBridge: BooInterface.getFunction('addBridge').format(
        FormatTypes.sighash,
      ),
      CreatePair: BridgeInterface.getFunction('createPair').format(
        FormatTypes.sighash,
      ),
      UpdatePair: BridgeInterface.getFunction('updatePair').format(
        FormatTypes.sighash,
      ),
      MPCRelease: BridgeInterface.getFunction('mpcRelease').format(
        FormatTypes.sighash,
      ),

      BridgeDOOToken: BridgeInterface.getFunction('convertDOO').format(
        FormatTypes.sighash,
      ),
      BridgeFrom: BridgeInterface.getFunction('convertFrom').format(
        FormatTypes.sighash,
      ),
      TransferNote: BTokenInterface.getFunction('transferNote').format(
        FormatTypes.sighash,
      ),
    },

    MinterMultiple: {
      Mint: MinterMultipleInterface.getFunction('mint').format(
        FormatTypes.sighash,
      ),
    },

    AccountManagement: {
      UpdateBlacklists: AccountManagementInterface.getFunction(
        'updateBlacklists',
      ).format(FormatTypes.sighash),
      UpdateWhitelists: AccountManagementInterface.getFunction(
        'updateWhitelists',
      ).format(FormatTypes.sighash),
      SetDisableWhitelist: AccountManagementInterface.getFunction(
        'setDisableWhitelist',
      ).format(FormatTypes.sighash),
      SetDisableBlacklists: AccountManagementInterface.getFunction(
        'setDisableBlacklists',
      ).format(FormatTypes.sighash),
    },

    MultiSig: {
      SubmitTransaction: MultiSigInterface.getFunction(
        'submitTransaction',
      ).format(FormatTypes.sighash),
      CancelTransaction: MultiSigInterface.getFunction(
        'cancelTransaction',
      ).format(FormatTypes.sighash),
      ExecuteTransaction: MultiSigInterface.getFunction(
        'executeTransaction',
      ).format(FormatTypes.sighash),
      ForceExecuteTransaction: MultiSigInterface.getFunction(
        'forceExecuteTransaction',
      ).format(FormatTypes.sighash),
      // ConfirmTransaction: MultiSigInterface.getFunction("confirmTransaction").format(FormatTypes.sighash),
      // RevokeTransaction: MultiSigInterface.getFunction("revokeTransaction").format(FormatTypes.sighash),

      AddOwner: MultiSigInterface.getFunction('addOwner').format(
        FormatTypes.sighash,
      ),
      RemoveOwner: MultiSigInterface.getFunction('removeOwner').format(
        FormatTypes.sighash,
      ),
      // UpdateWeight: MultiSigInterface.getFunction("updateWeight").format(FormatTypes.sighash),
    },
  },
}
