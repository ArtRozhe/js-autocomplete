/* eslint no-unused-vars: "off" */

import data from './data-providers/data.json';
import './assets/scss/auto-complete.scss';

const
    localDataProviderEx1 = new window.LocalDataProvider({
        data: data.cities,
        useCache: true
    }),
    localDataProviderEx2 = new window.LocalDataProvider({
        data: data.groupedData,
        useCache: true
    }),
    localDataProviderEx3 = new window.LocalDataProvider({
        data: data.cities,
        useCache: true
    }),
    apiDataProviderEx4 = new window.ApiDataProvider({
        apiPath: 'http://localhost:3003/dataSet?search=',
        useCache: true
    }),
    autoCompleteEx1 = new window.AutoComplete({
        containers: '.auto-complete_ex-1',
        dataProvider: localDataProviderEx1
    }),
    autoCompleteEx2 = new window.AutoComplete({
        containers: '.auto-complete_ex-2',
        dataProvider: localDataProviderEx2,
        minChars: 1,
        delay: 50
    }),
    autoCompleteEx3 = new window.AutoComplete({
        containers: '.auto-complete_ex-3',
        dataProvider: localDataProviderEx3,
        minChars: 1,
        delay: 50,
        generateLayoutSuggestion: function(suggestionText, searchingText) {
            let resultHtml = '';
            const re = new RegExp(`(${searchingText.split(' ').join('|')})`, 'gi');

            resultHtml = `${resultHtml}<div>${suggestionText.replace(re, '<span style="color: #FF5722;">$1</span>')}</div>`;

            return resultHtml;
        }
    }),
    autoCompleteEx4 = new window.AutoComplete({
        containers: '.auto-complete_ex-4',
        dataProvider: apiDataProviderEx4,
        minChars: 1,
        delay: 50
    });
