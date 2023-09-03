const moment = require('moment');

module.exports = {
    formatTimestamp() {
        let dateFormat = moment().format('MMMM Do YYYY, h:mm:ss a');
        return dateFormat;
    }
}