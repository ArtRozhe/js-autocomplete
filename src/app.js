import AutoComplete from './components/AutoComplete';
import LocalDataProvider from './data-providers/local';
import ApiDataProvider from './data-providers/api';

const
    autoComplete = new AutoComplete({
        containers: '.auto-complete'
    }),
    localDataProvider = new LocalDataProvider({
        data: ['Hello', 'World'],
        useCache: false
    }),
    apiDataProvider = new ApiDataProvider({
        apiPath: 'https://example.com',
        useCache: false
    });

autoComplete.destroy();

localDataProvider.getDataSet('test')
    .then(dataSet => {
        console.log('--- dataSet ---', dataSet);
    });

apiDataProvider.getDataSet('test')
    .then(dataSet => {
        console.log('--- dataSet ---', dataSet);
    });