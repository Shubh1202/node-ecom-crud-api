const { expressjwt: jwt } = require('express-jwt');

function authJWT(){
    const API_URL = process.env.API_URL
    const secret = process.env.JWT_TOKEN_SECRET
    const algorithm = process.env.JWT_TOKEN_ALGORITHM
    return jwt({
        secret: secret,
        algorithms: ["HS256"],
        isRevoked: isRevoked,
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/,  methods: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/, methods:['GET', 'OPTIONS']},
            `${API_URL}/users/login`,
            `${API_URL}/users/add`,
        ]
    })

}

async function isRevoked(req, token, done) {
    // if (!token.payload.isAdmi
    //     ) {
    //   return true;
    // }
    return false;
  }
module.exports = authJWT