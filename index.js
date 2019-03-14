const program = require('commander');
const { prompt } = require('inquirer'); // require inquirerjs library
// Require logic.js.js file and extract controller functions using JS destructuring assignment
const { createAdresses } = require('./logic');

// Craft questions to present to users
const questions = [
    {
        type: 'list',
        name: 'salutation',
        message: 'Choose your salutation ...',
        choices: [
            {name: 'Mr', value: 'MR'},
            {name: 'Ms', value: 'MS'},
            // {name: 'Company', value: 'COMPANY'},
        ]
    },
    {
        type: 'list',
        name: 'countryCodeA3',
        message: 'Choose your country ...',
        choices: [
            {name: 'United Kingdom', value: 'GBR'},
            {name: 'United States of America', value: 'USA'},
            {name: 'Belgium', value: 'BEL'},
        ]
    },
    {
        type: 'list',
        name: 'destinationCountryCodeA3',
        message: 'Choose your destination ID\'s country ...',
        choices: [
            {name: 'United Kingdom', value: 'GBR'},
            {name: 'United States of America', value: 'USA'},
            {name: 'Belgium', value: 'BEL'},
        ]
    },
    {
        type: 'list',
        name: 'didType',
        message: 'Choose the DID\'s type ...',
        choices: [
            "GEOGRAPHIC",
            "TOLL_FREE",
            "NATIONAL",
            "MOBILE",
            "INUM",
            "SHARED_COST",
            "SPECIAL"
        ]
    },
    {
        type : 'input',
        name : 'city',
        message : 'Enter your city name(maximum 60 characters) ...',
    },
    {
        type : 'input',
        name : 'zipCode',
        message : 'Enter your zip code ...',
    },
    {
        type : 'input',
        name : 'streetName',
        message : 'Enter your street name(maximum 50 characters) ...',
    },
    {
        type : 'input',
        name : 'buildingNumber',
        message : 'Enter your building number(maximum 10 characters) ...',
    },
    // {
    //     type : 'input',
    //     name : 'user',
    //     message : 'Enter your username ...',
    // },
    // {
    //     type : 'password',
    //     name : 'password',
    //     message : 'Enter your password ...',
    // },
];

program
    .version('0.0.1', '-v, --version')
    .description('Contact management system');

let orderPhone = program
    .command('orderPhone')
    .alias('a')
    .description('Order phone')
    .action(() => {
        prompt(questions).then(answers => {
            console.log(answers);
            console.log('In process...');
            createAdresses(answers).then((res, err) => {
                if(err) {
                    console.log({err});
                } else {
                    console.log({res}, res.errors[0]);
                }
            })
        });
    });

let testOrder = program
    .command('testOrder')
    .alias('t')
    .description('Test order')
    .action(()=>{
        let testData = {
            salutation: "COMPANY",
            companyName: "TEST",
            didType: "GEOGRAPHIC",
            destinationCountryCodeA3: "FRA",
            countryCodeA3: "FRA",
            city: "RENNES",
            zipCode: "35000",
            streetName: "10 Rue de Guebriant",
            buildingNumber: "10",
            identityDocumentProof: {
                nationality: "French",
                identityDocumentType: "NATIONAL_ID_CARD",
                identityDocumentNumber: "123123"
            }
        };
        console.log(testData);
        createAdresses(testData).then((res, err) => {
            if(err) {
                console.log({err});
            } else {
                console.log({res}, res.errors[0]);
            }
        })
    });

// console.log({orderPhone, getContactC});
// console.log('================');
// console.log(orderPhone.parent.commands);

// orderPhone();

program.parse(process.argv);