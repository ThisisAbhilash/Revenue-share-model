const Revenue = require('../Model/Revenue');
const Parameter = require('../Model/Parameter');
const uuidv1 = require('uuid/v1');

exports.saveRevenueModel = (req, res) => {
    if (!req.body) return res.status(400).send({ message: 'Missing Req Body' });
    console.log('Request to Add Revenue Model ', req.body);

    const Revenue = new User({
        uniqueId: uuidv1(),
        retailer_name: req.body.retailer_name,
    });

    Revenue.save()
        .then(data => {
            return res.status(200).send(data);
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while adding Revenue."
            });
        });
}

exports.addParameter = (req, res) => {
    if (!req.body && !req.body.uniqueId) return res.status(400).send({ message: 'Missing Req Body' });
    console.log('Request to Add Parameter to Revenue Model with unique id ', req.body.uniqueId);

    const Parameter = new Parameter({
        category: req.body.category,
        uuid: uuidv1(),
        type_of_income: req.body.of_income,
        isSlabPresent: req.body.isSlabPresent,
        slab: req.body.slab,
        validations: req.body.validations,
        isPostingDate: req.body.isPostingDate,
        isEndOfSeasonFlag: req.body.isEndOfSeasonFlag,
        date_slab: req.body.date_slab,
        deduction: req.boy.deduction,
    });

    Revenue.update(
        { uniqueId: req.body.uniqueId }, 
        { $push: { Parameter: Parameter } },
        (err, result) => {
            if(err) return res.status(500).send({message: 'Failed to update Model'});
            return res.status(200).send({message: 'Saved update Model'});
        }
    );
}

exports.getRevenueByName = (req, res) => {
    Revenue.find({ retailer_name: req.params.retailer_name}, (err, result) => {
        if(err) return res.status(500).send({message: 'Not Found'});
        return res.status(200).send({response: result});
    });
}