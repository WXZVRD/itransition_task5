export function genMockAddr(faker) {
    return {
        state: faker.location.state(),
        city: faker.location.city(),
        street: faker.location.streetAddress(),
    };
}

export function genMockProd(faker, locale) {
    const addressGroup = genMockAddr(faker);

    return {
        uid: faker.database.mongodbObjectId(),
        fullName: faker.person.fullName(),
        address: changeAddressPos({ ...addressGroup }),
        phone: faker.phone.number(`${locale.code} ### ### ###`),
    };
}

export function genMockData(faker, locale, count) {
    return new Array(count).fill().map(() => genMockProd(faker, locale));
}

export function changeAddressPos(address) {
    const randomAction = Math.random();

    if (randomAction < 0.5) {
        const keys = Object.keys(address);
        const key1 = keys[Math.floor(Math.random() * keys.length)];
        const key2 = keys[Math.floor(Math.random() * keys.length)];
        [address[key1], address[key2]] = [address[key2], address[key1]];
        return address;
    } else {
        const keys = Object.keys(address);
        const keyToRemove = keys[Math.floor(Math.random() * keys.length)];
        delete address[keyToRemove];
        return address;
    }
}
