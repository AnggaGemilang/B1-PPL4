'use strict';

/**
 * registrant service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::registrant.registrant');
