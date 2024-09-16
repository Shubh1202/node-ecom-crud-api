function errorHandler(err, req, res, next) {
    let msg
    switch (err.inner.name) {
        case 'TokenExpiredError':
            msg = `Your token has been expired.`
            break;
        case 'JsonWebTokenError':
            msg = `Your token is invalid.`
            break;
        case 'TokenExpiredError1':
            msg = `Your token has been expired.`
            break;
        case 'TokenExpiredError8':
            msg = `Your token has been expired.`
            break;
        default:
            switch(err.code){
                case 'revoked_token':
                    msg = `You don't have permission to acces this url.`
                    break;
                case 'credentials_required':
                    msg = `No authorization token was found`
                    break;
                default:
                    msg = `Token issue`
                    break;
            }
            break;
    }

    if(err.status==401){
        return res.status(err.status).send({status:'error', msg: msg})
    }
    return res.status(500).json({status:'error', msg: `Error in server.`})
    // return res.status(500).json(err)
}


module.exports = errorHandler