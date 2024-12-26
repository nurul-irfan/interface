import { faker } from 'uniswap/src/test/shared';
import { createFixture } from 'uniswap/src/test/utils';
export const dappInfoWC = createFixture()(() => ({
    source: 'walletconnect',
    name: faker.lorem.words(),
    url: faker.internet.url(),
    icon: faker.image.imageUrl(),
}));
export const dappInfoUwULink = createFixture()(() => ({
    source: 'uwulink',
    name: faker.lorem.words(),
    url: faker.internet.url(),
    icon: faker.image.imageUrl(),
    chain_id: faker.datatype.number(),
}));
//# sourceMappingURL=walletConnect.js.map