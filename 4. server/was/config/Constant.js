module.exports = {

    /**
     * App Name
     */
    APP: {
        NAME: 'Aram Seed WAS'
    },

    /**
     * Database Information For MongoDB
     */
    DATABASE : {
        POOL_SIZE: 10,
        HOST : '1.aram-in.com',
        PORT : '27017',
        NAME : 'Common',
        USER_ID: 'aram',
        USER_PASS: 'aram7242456'
    },

    /**
     * S3 BUCKET
     */
    S3_BUCKET: {
        TEMP: 'afun-mobile-temp',
        FILE: 'afun-mobile-media'
    },

    /**
     * SMS SERVER
     */
    SMS_DATABASE : {
        HOST : '1.aram-in.com',
        PORT : '3306',
        NAME : 'lg_sms',
        USER_ID : 'aram',
        USER_PASS : 'aram7242456',
        SMS_CALLBACK : '18005681'
    },

    /**
     * SESSION INFORMATION
     */
    SESSION : {
        DOMAIN: 'afunmobile.com',
        SECRET: 'afun',
        TTL: 604800,
        MAX_AGE: 604800000,
        COLLECTION: 'Session'
    },

    /**
     * EMAIL INFORMATION, (MAILER)
     */
    EMAIL: {
        HOST: 'smtp.gmail.com',
        POST: 465,
        USER_ID: 'afunmobile1@gmail.com',
        USER_PASS: 'interactive4'
    },

    /**
     * USER
     */
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

    /**
     * MEDIA
     */
    MEDIA: {
        SIZE: {
            MOBILE: 320
        },
        STATE: {
            SOURCE: 0,
            RELEASE: 1
        }
    },

    /**
     * Authentication Setting
     */
    AUTHENTICATION: {
        TEMP_PASSWORD_VALID_TIME: 3600000,
        LOGIN_TRY_MAX_COUNT: 5,
        LOGIN_FAILED_MAX_COUNT: 5,
        LOGIN_TRY_INTERVAL: 20000
    }
}