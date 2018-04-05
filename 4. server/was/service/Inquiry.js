const Inquiry = require('../model/Inquiry');

module.exports = {

    create: (id, name, title, contents, files) => {
        return Inquiry.schema(id, name, title, contents, files);
    },

    getById: (id) => {

    },

    listOfMe: () => {

    }

}