// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1032391086782029', // your App ID
        'clientSecret'    : 'ab5c2197b0ce2d104cb35b0f4dc93b16', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'         : '270896523680-etquu9pv2699c0o56amqtdb4uf2j5ibk.apps.googleusercontent.com',
        'clientSecret'     : 'eqTxUG8kX4qzq0Z-AmqmMZnF',
        'callbackURL'      : 'http://127.0.0.1:3000/auth/google/callback'
    }

};
