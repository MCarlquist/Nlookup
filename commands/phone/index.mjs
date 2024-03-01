import inquirer from 'inquirer';
import chalk from 'chalk';
import fetch from 'node-fetch';
import ora from 'ora';
import { handleFetchError } from '../../helpers/handleError.mjs';
import { displayResults } from '../../helpers/display.js';

/**
 * Checks a phone number by prompting the user for input, fetching data from a phone number database API, and displaying the results.
 * 
 * Prompts the user for a phone number using Inquirer. Tries to fetch data for the number from the database API, showing a spinner during the request. If the fetch succeeds, displays the phone number data. If it fails, shows an error. Catches any errors during the fetch and handles them.
*/
export async function checkPhoneNumber() {
    const { telephone } = await promptForPhoneNumber();
    try {
        const response = await fetchDataFromPhoneDatabase(telephone);

        const spinner = ora({
            text: 'Checking Number...',
            spinner: 'hamburger',
            prefixText: chalk.blue('Connecting to the phone database: '),
        }).start();

        if (response.succeed === 'Phone found') {
            const data = await response.phoneData;
            spinner.succeed('Phone number details obtained!');
            displayResults(data);
        } else {
            spinner.fail('Error getting phone number details');
        }

    } catch (error) {
        handleFetchError(error);
    }
}


/**
 * Prompts the user to input a phone number.
 *
 * @returns {Promise<{telephone: string}>} Promise resolving to object with 'telephone' property containing user input phone number.
 */
async function promptForPhoneNumber() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'telephone',
            message: 'Enter the telephone number:',
        },
    ]);
}

/**
 * Fetches phone number data from the phone validation API. 
 * 
 * @param {string} telephone - The phone number to look up.
 * 
 * @returns {object|string} - If successful, returns an object with the phone data and a 'Phone found' message. 
 * If unsuccessful, returns the status text.
 */
async function fetchDataFromPhoneDatabase(telephone) {
    
    // fetch data from the API
    const response = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=${process.env.API_KEY}&phone=${telephone}`);
    if (response.statusText === 'OK') {
        return {
            phoneData: await response.json(),
            succeed: 'Phone found',
        };
    } else {
        return response.statusText;
    }
}
