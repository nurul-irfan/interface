import { faker } from 'uniswap/src/test/shared';
import { createFixture } from 'uniswap/src/test/utils';
export const searchableRecipient = createFixture()(() => ({
    address: faker.finance.ethereumAddress(),
    name: faker.name.fullName(),
}));
export const recipientSection = createFixture(() => ({
    addresses: [faker.finance.ethereumAddress(), faker.finance.ethereumAddress()],
}))(({ addresses }) => ({
    title: faker.lorem.words(),
    data: addresses.map((address) => searchableRecipient({ address })),
}));
//# sourceMappingURL=recipients.js.map