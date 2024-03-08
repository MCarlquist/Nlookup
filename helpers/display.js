import Table from 'cli-table3';
import chalk from 'chalk';
/**
 * Displays results in a table.
 * 
 * @param {Object} data
*/
export function displayResults(data) {
    // Display the results in a table
    const info = [data]; // info is an array of objects from phone and IP data
    const header = info[0];
    const headerKeys = Object.keys(header).map(key => {
        // Remove underscores, capitalise, and separate words in the keys
        return key.replace(/_([a-z])/g, function (match) { return ' ' + match[1].toUpperCase(); }).replace(/^[a-z]/, function (match) { return match.toUpperCase(); });
    });
    const headerValues = Object.values(header);
    
    console.log('headerKeys: ', headerKeys);
    const table = new Table({
        head: headerKeys,
        colWidths: [20, 10, 20, 20, 20, 10],
        wordWrap: true,
    });

    // Iterates through the info array and pushes each phone number object's
    // data into a new row in the table variable to display the results.
    const keys = Object.keys(info[0]);
    info.forEach(item => {
        console.log('item: ', item);
        const values = Object.values(item);
        const tableRow = [];
        keys.forEach((key, index) => {
            if (key === 'valid') {
                tableRow.push(values[index] ? chalk.green('Yes') : chalk.red('No'));
            } else if(key === 'security') {
                const security = values[index].is_vpn ? chalk.green('Yes') : chalk.red('No');
                tableRow.push(security);
            } else {
                tableRow.push(values[index]);
            }
        });
        table.push(tableRow);
    });


    // Prints the phone number data table to the console.
    // This allows the user to see the results of the phone number lookup.
    console.log(table.toString());
};