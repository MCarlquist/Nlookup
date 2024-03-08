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
    
    let table = undefined;
    const isValid = !info[0].valid;
    if(headerKeys.includes('Message') || isValid) {
        table = new Table({
            head: ['Unfortunately'],
            colWidths: [40],
        });
        const errorMessage = 'The provided information is invalid';
        table.push([errorMessage]);
        // show the error table
        console.log(table.toString());
        return;
    } 
    
    table = new Table({
        head: headerKeys,
        colWidths: [20, 10, 20, 20, 20, 10],
        colAligns: 'center',
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
            // if the phone is a valid phone number
            if (key === 'valid') {
                tableRow.push(values[index] ? chalk.green('Yes') : chalk.red('No'));
            // Ip Address security
            } else if(key === 'security') {
                const security = values[index].is_vpn ? chalk.green('Is VPN') : chalk.red('Not VPN');
                tableRow.push(security);
            // Ip Address security
            } else if (key === 'timezone') {
                const currentTime = values[index].current_time;
                tableRow.push(currentTime);
            // Ip Address security
            } else if (key === 'flag') {
                const flag = values[index].emoji;
                tableRow.push(flag);
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