const
    express = require('express'),
    app = express(),
    port = 3003,
    data = require('./data'),
    getDataSet = require('./getDataSet').getDataSet;

app.get('/dataSet', (request, response) => {
    const
        search = request.query.search;
    if (search) {
        response.header('Access-Control-Allow-Origin', '*');
        response.send(getDataSet(data.cities, search));
    } else {
        response.send([]);
    }
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    return console.log(`server is listening on ${port}`);
});