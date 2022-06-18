module.exports = app => {
    // controller import
    const advisories = require('../controllers/advisory.controller.js');
    const router = require('express').Router();

    // create new 
    router.post('/', advisories.create);
    // retrieve all 
    router.get('/', advisories.findAll);
    // retrieve all published
    router.get('/published', advisories.findAllPublished);
    // retrieve one Advisory by id
    router.get('/:id', advisories.findOne);
    // update one Advisory by id
    router.put('/:id',advisories.update);
    // delete one by id
    router.delete('/:id', advisories.delete);
    // delete all Advisories
    router.delete('/', advisories.deleteAll);
    app.use('/api/advisories', router);
  };

/**
     /api/advisories: GET, POST, DELETE
    /api/advisories/:id: GET, PUT, DELETE
    /api/advisories/published: GET
 */