const Router = require('express').Router()
    , Handler = require('../middleware/Handler');

/**
 * @desc Get list of inquiries
 */
Router.get('');

/**
 * @desc Add new an inquiry
 */
Router.post('');

/**
 * @desc Get list of my inquiries
 */
Router.get('/me');

/**
 * @desc Get detail information of specific inquiry
 */
Router.get('/:id');

/**
 * @desc Modify inquiry
 */
Router.put('/:id');

/**
 * @desc Set answer of the inquiry
 */
Router.put('/:id/answer');

/**
 * @desc Delete inquiry
 */
Router.delete('/:id');

module.exports = Router;