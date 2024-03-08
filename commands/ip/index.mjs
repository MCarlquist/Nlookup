import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import fetch from 'node-fetch';
import Table from 'cli-table3';
import { handleFetchError } from '../../helpers/handleError.mjs';
import { displayResults } from '../../helpers/display.js';

export async function checkIpAddress() {
    const { ipAddress } = await promptForIPAddress();
    try {
        const response = await fetchDataFromIPDatabase(ipAddress);
        const spinner = ora({
            text: 'Checking Number...',
            spinner: 'hamburger',
            prefixText: chalk.blue('Connecting to the ip database: '),
        }).start();
        if (response.succeed) {
            const data = await response.ipData;
            spinner.succeed('Ip address confirmed and details obtained!');
            displayResults(data);
        } else {
            spinner.fail(response.message);
        }

    } catch (error) {
        handleFetchError(error);
    }
}

async function promptForIPAddress() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'ipAddress',
            message: 'Enter the IP address:',
        },
    ]);
}

async function fetchDataFromIPDatabase(ipAddress) {
    
    // fetch data from the API
    const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.IP_KEY}&ip_address=${ipAddress}`);
    if (response.statusText === 'OK') {
        return {
            ipData: await response.json(),
            succeed: true,
        };
    } else {
        return {
            message: response.statusText
        };
    }
}

// function displayResults(data) {
//     // Display the results in a table
//     const ipData = [data][0];

//     const table = new Table({
//         head: ['IP Address', 'Flag', 'Country', 'Location', 'Use VPN', 'Latitude', 'Longitude'],
//         colWidths: [20, 10, 15, 20, 10, 15, 15],
//         wordWrap: true,
//     });

//     // Iterates through the phoneData array and pushes each phone number object's
//     // data into a new row in the table variable to display the results.
//     const ipValues = Object.values(ipData);

//     // Optimized to directly access the needed values instead of looping
//     let ip_address = ipValues[0];
//     let flag = ipValues[18].emoji;
//     let country = ipValues[7];
//     let city = ipValues[1];
//     let use_vpn = ipValues[16].is_vpn;
//     let latitude = ipValues[14];
//     let longitude = ipValues[15];

//     table.push([
//         ip_address,
//         flag,
//         country,
//         city,
//         use_vpn ? chalk.green('Yes') : chalk.red('No'),
//         latitude,
//         longitude
//     ]);

    
//     // Prints the phone number data table to the console.
//     // This allows the user to see the results of the phone number lookup.
//     console.log(table.toString());
// };