module.exports = {

    APP: {
        NAME: ''
    },
    
    DATABASE : {
        POOL_SIZE: 10,
        HOST : '52.78.112.87',
        PORT : '27017',
        NAME : 'TreasureIsland',
        USER_ID: 'afunmobile',
        USER_PASS: 'interactive1!'
    },

    S3: {
        TEMP: 'afun-mobile-temp',
        MEDIA: 'afun-mobile-media'
    },

    SMS_DATABASE : {
        HOST : '1.aram-in.com',
        PORT : '3306',
        NAME : 'lg_sms',
        USER_ID : 'aram',
        USER_PASS : 'aram7242456',
        SMS_CALLBACK : '18005681'
    },

    SESSION : {
        DOMAIN: 'afunmobile.com',
        SECRET: 'afun',
        TTL: 604800,
        MAX_AGE: 604800000,
        COLLECTION: 'Session'
    },

    EMAIL: {
        HOST: 'smtp.gmail.com',
        POST: 465,
        USER_ID: 'afunmobile1@gmail.com',
        USER_PASS: 'interactive4'
    },

    USER: {
        STATE: {
            NEWER: 0,
            NORMAL: 1,
            EXCEED_COUNT : 7,
            LOST_PASSWORD: 8,
            DELETED: 9
        },
        LEVEL: {
            NORMAL: 1,
            MANAGER: 2,
            ADMIN: 9
        }
    },

    MEDIA: {
        SIZE: {
            MOBILE: 320
        },
        STATE: {
            SOURCE: 0,
            RELEASE: 1
        }
    },

    INQUIRY: {
        STATE: {
            UNCOMPLETED: 0,
            COMPLETED: 1
        }
    },

    TOUR: {
        STATE: {
            STOP: 0,
            ON: 1
        }
    },

    EXCHANGE: {
        STATE: {
            RESERVED: 0,
            EXCHANGED: 1
        }
    },

    AUTHENTICATION: {
        TEMP_PASSWORD_VALID_TIME: 3600000,
        LOGIN_TRY_MAX_COUNT: 5,
        LOGIN_FAILED_MAX_COUNT: 5,
        LOGIN_TRY_INTERVAL: 20000
    }
}