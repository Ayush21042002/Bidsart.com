const moment = require('moment');

function formatMessage(username, text,winningUser) {
    return {
        username,
        text,
        winningUser,
        time: moment().format('h:mm a')
    }
}


module.exports = formatMessage;