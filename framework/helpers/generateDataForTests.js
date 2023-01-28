import { faker } from '@faker-js/faker';

const randomData = {
    randomUserId: faker.datatype.uuid(),
    randomIsbn:faker.random.numeric(6)
}

export default randomData;
