import AutoComplete from './components/AutoComplete';
import LocalDataProvider from './data-providers/local';
import ApiDataProvider from './data-providers/api';
import './assets/scss/app.scss';
import data from './data-providers/data.json';

const
    localDataProvider = new LocalDataProvider({
        data: data.capitals,
        useCache: false,
        selectStrategyCb: (search, dataItem) => {
            return dataItem.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }
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

apiDataProvider.getDataSet('test')
    .then(dataSet => {
        console.log('--- dataSet ---', dataSet);
    });