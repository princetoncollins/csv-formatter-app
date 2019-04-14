// Modules.
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const request = require('request');

// Custom CSV string formatter module.
const formatStringToCsv = require('./utils/format-csv-string');

// App setup.
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const nodeModulesDirectoryPath = path.join(__dirname, '../node_modules');

app.use(express.static(publicDirectoryPath));
app.use('/node_modules', express.static(nodeModulesDirectoryPath));

//////////
// Routes.
//////////

app.get('/api/format', (req, res) => {
    // Must be passed a query parameter, or we return warning notice to the end user.
    if (!req.query.string) {
        return res.send({ 
            error: 'Please provide a CSV string delimited by carriage returns.\r\n(e.g. "Header One","HeaderTwo"\\r\\n"Value One","Value Two")'
        });
    }
    formatStringToCsv(req.query.string)
    .then(function(response) {
        if (response.error) {
            // Logging the error response to the terminal. Might be helpful.
            console.log(chalk.red(response.error));
            return res.send({ data: response });
        }
        // Logging the response to the terminal. Might be helpful. It's pretty too. :)
        console.log(chalk.yellow('Formatted CSV string output:'));
        console.log(chalk.cyan(response));
        res.send({ data: response });
    });
});

// Listen to server.
app.listen(9001, () => {
    console.log(chalk.green('Server is running on port 9001.'));
});