import utils from 'web3-utils';
import { Transaction } from 'web3-core';

export const blockFormatter = (tx: any): Transaction => {
  if (tx.blockNumber !== null) {
    tx.blockNumber = utils.hexToNumber(tx.blockNumber);
  }

  if (tx.transactionIndex !== null) {
    tx.transactionIndex = utils.hexToNumber(tx.transactionIndex);
  }

  tx.nonce = utils.hexToNumber(tx.nonce);
  tx.gas = utils.hexToNumber(tx.gas);

  if (tx.gasPrice) {
    tx.gasPrice = utils.toBN(tx.gasPrice).toString(10);
  }

  if (tx.maxFeePerGas) {
    tx.maxFeePerGas = utils.toBN(tx.maxFeePerGas).toString(10);
  }

  if (tx.maxPriorityFeePerGas) {
    tx.maxPriorityFeePerGas = utils.toBN(tx.maxPriorityFeePerGas).toString(10);
  }

  if (tx.type) {
    tx.type = utils.hexToNumber(tx.type);
  }

  if (tx.value) {
    tx.value = utils.toBN(tx.value).toString(10);
  }

  if (tx.to && utils.isAddress(tx.to)) {
    // tx.to could be `0x0` or `null` while contract creation
    tx.to = utils.toChecksumAddress(tx.to);
  } else {
    tx.to = null; // set to `null` if invalid address
  }

  if (tx.from) {
    tx.from = utils.toChecksumAddress(tx.from);
  }

  return tx;
};
