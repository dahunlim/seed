module.exports = {

    APP: {
        NAME: 'S-ENGLISH'
    },

    DATABASE : {
        POOL_SIZE: 10,
        HOST : '',
        PORT : '',
        NAME : '',
        USER_ID: '',
        USER_PASS: ''
    },

    S3_BUCKET: {
        TEMP: '',
        FILE: ''
    },

    SMS_DATABASE : {
        HOST : '',
        PORT : '',
        NAME : '',
        USER_ID : '',
        USER_PASS : '',
        SMS_CALLBACK : ''
    },

    SESSION : {
        DOMAIN: 'aram-in.com',
        SECRET: 'aramin',
        TTL: 604800,
        MAX_AGE: 604800000,
        COLLECTION: 'Session'
    },

    EMAIL: {
        HOST: '',
        POST: 465,
        USER_ID: '',
        USER_PASS: ''
    },

    MEDIA: {
        RESIZER: {
            COUNT: 4
        },
        SIZE: {
            ICON: 120,
            MOBILE: 320,
            DESKTOP: 1024
        },
        STATE: {
            SOURCE: 0,
            RELEASE: 1
        }
    },

    AUTHENTICATION: {
        TEMP_PASSWORD_VALID_TIME: 3600000,
        LOGIN_TRY_MAX_COUNT: 5,
        LOGIN_FAILED_MAX_COUNT: 5,
        LOGIN_TRY_INTERVAL: 20000
    },

    /**************************************
     * Domain Specific Settings
     **************************************/

    USER: {
        STATE: {
            NEWER: 0,
            NORMAL: 1,
            EXCEED_COUNT : 7,
            LOST_PASSWORD: 8,
            DELETED: 9
        },
        LEVEL: {
            INSTRUCTOR: 1,
            MANAGER: 5,
            STAFF: 8,
            ADMIN: 9
        }
    },

    INQUIRY: {
        STATE: {
            UNCOMPLETED: 0,
            COMPLETED: 1
        }
    }
}
