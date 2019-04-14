const formatStringToCsv = (stringArg) => {
    let formattedCsvString = '';
    // Function to format the string input into CSV styled out with brackets.
    const format = (rows) => {
        rows.map((row) => {
            for (let i = 0; i < row.length; i++) {
                row[i] = '[' + row[i] + ']' + ' ';
            }
        });
        let unformattedCsvRows = JSON.parse(JSON.stringify(rows));
        for (let j = 0; j < unformattedCsvRows.length; j++) {
            let row = unformattedCsvRows[j].join('');
            formattedCsvString += row + '\r\n';
        }
        return formattedCsvString;
    }
    // Data to be returned.
    const promise = new Promise((resolve, reject) => {
        let dataRows = [];
        // Check if the string input has more than one line, indicated by \n. In a case where there isn't, it likely isn't quite a 'true' CSV. Return a warning notice to end user.
        if (stringArg.match(/\\n/) === null) {
            return reject({ error: 'Invalid input.\r\n\r\n Please provide a CSV string delimited by carriage returns.\r\n(e.g. "Header One","HeaderTwo"\\r\\n"Value One","Value Two")' });
        } else {
            // Split the string input on carriage returns to identify and return rows.
            let filteredRows = stringArg.replace(/\\r\\n/g, "\\n").split('\\n');
            dataRows.push(filteredRows.map((row) => {
                row = row.replace('\n', '').trim().replace("'", '').split();
                return row = eval('[' + row[0] + ']');
            }));
            // Make sure the header row and all subsequent rows have same number of indexes/fields. Otherwise, return a warning notice to user.
            for (let i = 1; i < dataRows[0].length; i++) {
                const headerRow = dataRows[0][0];
                if (dataRows[0][i].length !== headerRow.length) {
                    return reject({ error: 'Delimited rows must all have the same number of fields.\r\n\r\nPlease provide a header row and at least one data row.' });
                }
            }
            return resolve(dataRows[0]);
        }
    })
    .then((dataRows) => {
        return format(dataRows);
    })
    .catch((error) => {
        return error;
    });
    return promise;
}

module.exports = formatStringToCsv;