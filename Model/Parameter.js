const mongoose = require('mongoose');

const ParameterSchema = mongoose.Schema({
    category: { type: String },
    uuid: { type: String },
    type_of_income: { type: String },
    rate: { type: Number },   //may not store here --- let this be only in contract
    isSlabPresent: { type: Boolean },
    slab: [{
        lowerRange: { type: Number },
        upperRange: { type: Number },
        rate: { type: Number },  //may not store here --- let this be only in contract
        uuid: { type: String }
    }],
    validations: [{
        valid_category: {
            type: String,
            enum: ['AREA', 'DURATION', 'NUMBER_OF_TIMES_PER_YEAR', 'COUNT']
        },
        value: { type: String }
    }],
    isPostingDate: { type: Boolean },
    isEndOfSeasonFlag: { type: Boolean },
    date_slab: [{
        startDate: { type: String },
        endDate: { type: String },
        rate: { type: Number },    //may not store here --- let this be only in contract
        uuid: { type: String }
    }],
    deduction: { type: String }
});

module.exports = ParameterSchema;