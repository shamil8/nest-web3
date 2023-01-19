import utils from 'web3-utils';
import { formatters } from 'web3-core-helpers';
import { Transaction } from 'web3-core';

export const transactionFormatter = (tx: any): Transaction => {
  if (tx.blockNumber !== null) {
    tx.blockNumber = utils.hexToNumber(tx.blockNumber);
  }

  if (tx.transactionIndex !== null) {
    tx.transactionIndex = utils.hexToNumber(tx.transactionIndex);
  }

  tx.nonce = utils.hexToNumber(tx.nonce);
  tx.gas = formatters.outputBigNumberFormatter(tx.gas);
  tx.gasPrice = formatters.outputBigNumberFormatter(tx.gasPrice);
  tx.value = formatters.outputBigNumberFormatter(tx.value);

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
