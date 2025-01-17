import { TransactionStatus, TransactionType, } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { faker } from 'uniswap/src/test/shared';
import { createFixture, randomEnumValue } from 'uniswap/src/test/utils';
export const gqlTransaction = createFixture()(() => ({
    __typename: 'Transaction',
    id: faker.datatype.uuid(),
    hash: faker.datatype.uuid(),
    blockNumber: faker.datatype.number(),
    from: faker.finance.ethereumAddress(),
    to: faker.finance.ethereumAddress(),
    nonce: faker.datatype.number(),
    status: randomEnumValue(TransactionStatus),
}));
export const gqlTransactionDetails = createFixture({
    transactionStatus: randomEnumValue(TransactionStatus),
})(({ transactionStatus }) => ({
    __typename: 'TransactionDetails',
    id: faker.datatype.uuid(),
    hash: faker.datatype.uuid(),
    from: faker.finance.ethereumAddress(),
    to: faker.finance.ethereumAddress(),
    nonce: faker.datatype.number(),
    /** @deprecated use transactionStatus to disambiguate from swapOrderStatus */
    status: transactionStatus,
    transactionStatus,
    type: randomEnumValue(TransactionType),
    assetChanges: [],
}));
//# sourceMappingURL=transactions.js.map