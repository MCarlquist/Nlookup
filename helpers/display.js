import Table from 'cli-table3';
/**
 * Displays results in a table.
 * 
 * @param {Object} data
*/
export function displayResults(data) {
    // Display the results in a table
    const phoneData = [data];

    const table = new Table({
        head: ['Phone Number', 'Country Prefix', 'Location', 'Carrier', 'Type', 'Valid'],
        colWidths: [20, 10, 20, 20, 20, 10],
        wordWrap: true,
    });

    // Iterates through the phoneData array and pushes each phone number object's
    // data into a new row in the table variable to display the results.
    phoneData.forEach(item => {
        table.push([
            item.format.local,
            item.country.prefix,
            item.country.name,
            item.carrier || 'N/A',
            item.type,
            item.valid ? chalk.green('Yes') : chalk.red('No'),
        ]);
    });

    // Prints the phone number data table to the console.
    // This allows the user to see the results of the phone number lookup.
    console.log(table.toString());
};