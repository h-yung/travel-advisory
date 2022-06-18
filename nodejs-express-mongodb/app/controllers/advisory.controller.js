const db = require('../models');
const Advisory = db.advisory;

// refer to the keys generated in .model.js

// create and save new
exports.create = (req,res) => {
    // validate the req
    if (!req.body.country) {
        res.status(400).send({ message: 'Country must be provided' })
        return;
    }
    // make new Advisory - cross ref this for FE
    const advisory = new Advisory({
        country: req.body.country, //FE dropdown for avoidance of user input errors?
        'negative covid test required': req.body.covTest, //FE radio button
        'covid test detail': req.body.testDetail, //FE input text
        'accepted tests': req.body.testType, //FE input test
        'vaccination proof required': req.body.vaxProof, //FE radio button
        'vaccination proof detail': req.body.vaxDetail, //FE input text
        'accepted proof': req.body.vaxType, //FE input text? multiple input texts assigned to single var to send?
        sourceName: req.body.sName, //FE input text
        sourceLink1: req.body.covTestLink,  //FE input text - perhaps validate
        sourceLink2: req.body.vaxProofLink,  //FE input text - perhaps validate
        published: req.body.published ? req.body.published : false
    });
    // save new Advisory to database
    advisory
        .save(advisory)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'An error occurred while creating the Advisory.'
            });
        });

};

// retrieve all Advisories fr database
exports.findAll = (req,res) => {
    const country = req.query.country; //note .query not .body - this becomes the condition
    const condition = country ? { country: { $regex: new RegExp(country), $options: 'i' }} : {}; //diff: const not var here
    Advisory.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || 'An error occurred while retrieving Advisories.'
            });
        });
};

// find one Advisory by id
exports.findOne = (req,res) => {
    const id = req.params.id; //ref for FE
    Advisory.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot find Advisory with id ${id}` });
            }else res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || `Error retrieving Advisory with id ${id}.`
            });
        });
}

// Update one Advisory, found by id in the req
exports.update = (req,res) => {
    if (!req.body){
        return res.status(400).send({
            message: 'Data to update cannot be empty.'
        });
    }
    const id = req.params.id; //ref for FE
    Advisory.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data){
                res.status(404).send({ message: `Cannot update Advisory with id ${id} - Advisory might not have been found.` });
            }else res.send({ message: 'Advisory successfully updated.' });
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || `Error updating Advisory with id ${id}.`
            });
        });
}

// delete one Advisory, found by id in the req
exports.delete = (req,res) => {
    const id = req.params.id;
    Advisory.findByIdAndRemove(id)
        .then(data => {
            if (!data){
                res.status(404).send({ message: `Cannot delete Advisory with id ${id} - Advisory might not have been found.` });
            }else res.send({ message: 'Advisory successfully deleted.' });
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || `Error deleting Advisory with id ${id}.`
            });
        });
}

// delete all Advisories fr database
exports.deleteAll = (req,res) => {
    Advisory.deleteMany({})
        .then(data => {
            res.send({ message: `${data.deletedCount} Advisories successfully deleted.` });
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || `Error occurred while attempting to delete all Advisories.`
            });
        });
}

// find all published Advisories. pagination response not written currently
exports.findAllPublished = (req,res) => {
    Advisory.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || `Error occurred while retrieving all published Advisories.`
            });
        });
}