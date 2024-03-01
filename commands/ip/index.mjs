import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import fetch from 'node-fetch';
import Table from 'cli-table3';
import { handleFetchError } from '../../helpers/handleError.mjs';

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
            const data = response;
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

    const testData = {
            "ip_address": "166.171.248.255",
            "city": "San Jose",
            "city_geoname_id": 5392171,
            "region": "California",
            "region_iso_code": "CA",
            "region_geoname_id": 5332921,
            "postal_code": "95141",
            "country": "United States",
            "country_code": "US",
            "country_geoname_id": 6252001,
            "country_is_eu": false,
            "continent": "North America",
            "continent_code": "NA",
            "continent_geoname_id": 6255149,
            "longitude": -121.7714,
            "latitude": 37.1835,
            "security": {
                "is_vpn": false
            },
            "timezone": {
                "name": "America/Los_Angeles",
                "abbreviation": "PDT",
                "gmt_offset": -7,
                "current_time": "06:37:41",
                "is_dst": true
            },
            "flag": {
                "emoji": "🇺🇸",
                "unicode": "U+1F1FA U+1F1F8",
                "png": "https://static.abstractapi.com/country-flags/US_flag.png",
                "svg": "https://static.abstractapi.com/country-flags/US_flag.svg"
            },
            "currency": {
                "currency_name": "USD",
                "currency_code": "USD"
            },
            "connection": {
                "autonomous_system_number": 20057,
                "autonomous_system_organization": "ATT-MOBILITY-LLC-AS20057",
                "connection_type": "Cellular",
                "isp_name": "AT&T Mobility LLC",
                "organization_name": "Service Provider Corporation"
            }
        };
    const ohYeah = true;
    if (ohYeah) {
        return {
            ipData: testData,
            succeed: true,
        };
    } else {
        return {
            message: 'Error getting ip address details'
        };
    }
    // // fetch data from the API
    // const response = await fetch(testData);

    // if (response.statusText === 'OK') {
    //     return {
    //         ipData: await response.json(),
    //         succeed: true,
    //     };
    // } else {
    //     return {
    //         message: response.statusText
    //     };
    // }
}


export function displayResults(data) {
    // Display the results in a table
    const { ipData } = [data][0];
    
    const table = new Table({
        head: ['IP Address', 'Flag', 'Country', 'Location', 'Use VPN', 'Latitude', 'Longitude'],
        colWidths: [20, 5, 15, 20, 10, 10, 10],
        wordWrap: true,
    });

    // Iterates through the phoneData array and pushes each phone number object's
    // data into a new row in the table variable to display the results.
    const combined = [...Object.keys(ipData),...Object.values(ipData)];
    const ipValues = Object.values(ipData);
    console.log('ipData', ipValues);
    console.log('combined', combined);
    // loops through combined array

    combined.forEach(item => {
       console.log('items', item);
       let ip_address = undefined;
       let country = undefined;
       if (item === 'ip_address') {
         ip_address = ipValues[0];
    }

    if (item === 'country') {
        country = ipValues[7];
    }

    console.log('ip_address', ip_address);
       table.push([
        ip_address,
        null,
        country,
            // item.ip_address,
            //     item.flag.emoji || item.flag.unicode,
            //     item.country,
            //     `${item.city}, ${item.region_iso_code}`,
            //     item.security.is_vpn ? chalk.green('Yes') : chalk.red('No'),
            //     item.latitude,
            //     item.longitude
        ]);
    });


    // Prints the phone number data table to the console.
    // This allows the user to see the results of the phone number lookup.
    console.log(table.toString());
};