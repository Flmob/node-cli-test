const fetch = require("node-fetch");
const base64 = require('base-64');

// const VoxboneUrl = 'https://api.voxbone.com/ws-voxbone/services/rest';
const VoxboneUrl = 'https://sandbox.voxbone.com/ws-voxbone/services/rest';
const user = '*********';
const password = '**********';

const createAdresses = (data) => {
    const requiredFields = [
        "buildingNumber",
        "city",
        "countryCodeA3",
        "destinationCountryCodeA3",
        "didType",
        "salutation",
        "streetName",
        "zipCode",
        // "user",
        // "password"
    ];

    let isErr = false;
    let error = null;

    //check required fields
    requiredFields.some(requiredKey => {
        if(!data[requiredKey]) {
            console.log('in if');

            isErr = true;

            error = new Error(`Field ${requiredKey} is required`);
        }

        return isErr;
    });

    if(isErr) {
        return Promise.reject(error);
    }

    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=BOUNDARY',
            'Accept': 'application/json',
            // 'Authorization': `Basic ${base64.encode(`${data.user}:${data.password}`)}`,
            'Authorization': `Basic ${base64.encode(`${user}:${password}`)}`,
        },
        body: JSON.stringify(data)
    };

    return fetch(`${VoxboneUrl}/regulation/address`, params)
        .then(res => {
            console.log({res});
            return res.json();
        });
};

// Export all methods
module.exports = { createAdresses };