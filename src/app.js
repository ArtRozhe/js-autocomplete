/* eslint no-unused-vars: "off" */

import data from './data-providers/data.json';
import './assets/scss/auto-complete.scss';

const
    localDataProvider = new window.LocalDataProvider({
        data: data.simpleStrings,
        useCache: true
    }),
    /*apiDataProvider = new window.ApiDataProvider({
        apiPath: 'http://localhost:3003/dataSet?search=',
        useCache: true
    }),*/
    autoComplete = new window.AutoComplete({
        containers: '.auto-complete',
        delay: 150,
        dataProvider: localDataProvider,
        minChars: 1
    });
