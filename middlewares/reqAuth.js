const jwt = require('jsonwebtoken');

function authToken(rawToken) {
    let data = {
        status : false,
        data : null
    }
    const token = rawToken && rawToken.split(' ')[1];
    if (token == null) {
        console.log("token kosong")
    } else {
        try {
            var verify = jwt.verify(token, process.env.TOKEN_SECRET);
            data.status = true
            data.data = verify
        } catch (error) {
            const ww = JSON.stringify(error)
            data.data = JSON.parse(ww)
        }

    }
    return data;
}

module.exports = {
    authToken
}