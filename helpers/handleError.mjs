import chalk from 'chalk';

export async function handleFetchError(error) {
    console.error(chalk.bgRed('Error fetching data:', error.message));
}