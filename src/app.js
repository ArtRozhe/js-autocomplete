import AutoComplete from './components/AutoComplete';
import LocalDataProvider from './data-providers/local';
import ApiDataProvider from './data-providers/api';
import './assets/scss/app.scss';
import data from './data-providers/data.json';

const
    localDataProvider = new LocalDataProvider({
        data: data.capitals,
        useCache: false
    }),
    autoComplete = new AutoComplete({
        containers: '.auto-complete',
        delay: 150,
        dataProvider: localDataProvider,
        minChars: 1
    }),
    apiDataProvider = new ApiDataProvider({
        apiPath: 'https://example.com',
        useCache: false
    });

window.autoComplete = autoComplete;

localDataProvider.getDataSet('a')
    .then(dataSet => {
        console.log('--- dataSet ---', dataSet);
    });

apiDataProvider.getDataSet('test')
    .then(dataSet => {
        console.log('--- dataSet ---', dataSet);
    });