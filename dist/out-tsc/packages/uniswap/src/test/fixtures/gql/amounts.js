import { Currency, } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { MAX_FIXTURE_TIMESTAMP, faker } from 'uniswap/src/test/shared';
import { createFixture, randomEnumValue } from 'uniswap/src/test/utils';
export const amount = createFixture()(() => ({
    __typename: 'Amount',
    id: faker.datatype.uuid(),
    value: faker.datatype.float({ min: 0, max: 1000, precision: 0.01 }),
    currency: randomEnumValue(Currency),
}));
const usdAmountFactory = (value) => (currency = Currency.Usd) => amount({ value, currency });
export const amounts = {
    none: usdAmountFactory(0),
    xs: usdAmountFactory(0.05),
    sm: usdAmountFactory(5),
    md: usdAmountFactory(55),
    lg: usdAmountFactory(5500),
    xl: usdAmountFactory(500000),
};
export const timestampedAmount = createFixture()(() => ({
    __typename: 'TimestampedAmount',
    id: faker.datatype.uuid(),
    timestamp: faker.datatype.number({ max: MAX_FIXTURE_TIMESTAMP }),
    value: faker.datatype.float({ min: 0, max: 1000, precision: 0.01 }),
}));
//# sourceMappingURL=amounts.js.map