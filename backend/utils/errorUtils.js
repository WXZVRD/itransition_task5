import { allFakers } from "@faker-js/faker";

function delWords(text) {
    if (text.length === 0) {
        return text;
    }
    const randomIndex = Math.floor(Math.random() * text.length);
    return text.slice(0, randomIndex) + text.slice(randomIndex + 1);
}

function addWords(text, locale) {
    if (text.length === 0) {
        return text;
    }
    const faker = allFakers[locale];
    const randomIndex = Math.floor(Math.random() * text.length);
    const randomChar = faker.string.alpha();
    return text.slice(0, randomIndex) + randomChar + text.slice(randomIndex);
}

function swapWords(text) {
    if (text.length < 2) {
        return text;
    }

    const randomIndex = Math.floor(Math.random() * (text.length - 1));
    const chars = text.split('');
    [chars[randomIndex], chars[randomIndex + 1]] = [chars[randomIndex + 1], chars[randomIndex]];
    return chars.join('');
}

function genRandomError(value, errorRate, locale) {
    if (!value || value.length === 0) {
        return value;
    }
    const errorType = Math.floor(Math.random() * 3);
    let failValue = value;

    if (Number.isInteger(errorRate) ? Math.random() < errorRate : errorRate > Math.random()) {
        if (errorType === 0) {
            failValue = delWords(failValue);
        } else if (errorType === 1) {
            failValue = addWords(failValue, locale);
        } else {
            if (failValue && failValue.length >= 2) {
                failValue = swapWords(failValue);
            }
        }
    }
    return failValue;
}




function genFailAddr(address, errorRate, locale) {
    const failAddress = {};

    if (address.state) {
        failAddress.state = genRandomError(address.state, errorRate, locale);
    }
    if (address.city) {
        failAddress.city = genRandomError(address.city, errorRate, locale);
    }
    if (address.street) {
        failAddress.street = genRandomError(address.street, errorRate, locale);
    }

    return failAddress;
}

export function genFailProd(originalProducts, totalErrors, errorRate, locale) {
    const failProducts = originalProducts.map(product => {
        const fields = ['fullName', 'address', 'uid', 'phone'];
        let failFullName = product.fullName || '';
        let failAddress = product.address || {};
        let failUid = product.uid || '';
        let failPhone = product.phone || '';

        for (let i = 0; i < totalErrors; i++) {
            const idx = i % fields.length;
            const field = fields[idx];

            if (field === 'fullName') {
                failFullName = genRandomError(failFullName, errorRate, locale);
            } else if (field === 'address') {
                failAddress = genFailAddr(failAddress, errorRate, locale);
            } else if (field === 'uid') {
                failUid = genRandomError(failUid, errorRate, locale);
            } else if (field === 'phone') {
                failPhone = genRandomError(failPhone, errorRate, locale);
            }
        }

        return {
            ...product,
            address: failAddress,
            fullName: failFullName,
            uid: failUid,
            phone: failPhone,
        };
    });

    return failProducts;
}


