const mongoose = require('mongoose');
const ParameterSchema = require('./Parameter');
const RevenueSchema = mongoose.Schema({
    uniqueId: { type: String},
    retailer_name: { type: String },
    Parameter: [{
        type: ParameterSchema
    }],
    isMGLFApplicable: { type: Boolean },
    MGLF_Value: {
        value: { type: String },
        category: {
            type: String,
            enum: ['LOWER', 'UPPER', 'BOTH']
        }
    },
    contractAddress: { type: String }
})

module.exports = model = mongoose.model('Revenue_Params', RevenueSchema);