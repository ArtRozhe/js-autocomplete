function getDataSet(data, search) {
    let result = [];

    if (Object.prototype.toString.call(data[0]) === '[object String]') {
        result = data.filter(item => {
            return item.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    } else {
        data.forEach(item => {
            let innerData = [];
            if (!item.title || !item.data) {
                return;
            }

            innerData = item.data.filter(innerItem => {
                return innerItem.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });

            if (innerData.length > 0) {
                result.push({
                    title: item.title,
                    data: innerData
                });
            }
        });
    }

    return result;
}

module.exports = {
    getDataSet
};