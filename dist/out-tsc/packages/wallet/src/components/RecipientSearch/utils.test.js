import { faker } from '@faker-js/faker';
import { SAMPLE_SEED_ADDRESS_1, SAMPLE_SEED_ADDRESS_2 } from 'uniswap/src/test/fixtures';
import { filterSections } from 'wallet/src/components/RecipientSearch/utils';
import { recipientSection } from 'wallet/src/test/fixtures';
const recipientSections = [
    recipientSection({ addresses: [SAMPLE_SEED_ADDRESS_1, SAMPLE_SEED_ADDRESS_2] }),
    recipientSection({ addresses: [SAMPLE_SEED_ADDRESS_1] }),
    recipientSection({ addresses: [faker.finance.ethereumAddress()] }),
    recipientSection({ addresses: [SAMPLE_SEED_ADDRESS_2] }),
];
describe(filterSections, () => {
    it('returns empty array if filteredAddresses is empty', () => {
        expect(filterSections(recipientSections, [])).toEqual([]);
    });
    it('filters out sections without filteredAddresses', () => {
        const filteredAddresses = [SAMPLE_SEED_ADDRESS_1, SAMPLE_SEED_ADDRESS_2];
        expect(filterSections(recipientSections, filteredAddresses)).toEqual([
            recipientSections[0],
            recipientSections[1],
            recipientSections[3],
        ]);
    });
    it('returns sections corresponding to the filtered addresses with matching addresses', () => {
        expect(filterSections(recipientSections, [SAMPLE_SEED_ADDRESS_1])).toEqual([
            {
                title: recipientSections[0].title,
                data: [recipientSections[0].data[0]], // only the first item in the first section matches
            },
            recipientSections[1],
        ]);
        expect(filterSections(recipientSections, [SAMPLE_SEED_ADDRESS_2])).toEqual([
            {
                title: recipientSections[0].title,
                data: [recipientSections[0].data[1]], // only the second item in the first section matches
            },
            recipientSections[3],
        ]);
    });
});
//# sourceMappingURL=utils.test.js.map