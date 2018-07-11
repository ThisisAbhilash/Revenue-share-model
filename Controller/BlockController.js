const Revenue = require('../Model/Revenue');
const allConfig = require('../Config/allConfig');
const helper = require('../Utils/helper');

// config for personal calls to ethereum
const per = require('web3-eth-personal');
const PersonalCalls = new per(allConfig.gethURL);

//config to geth 
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(allConfig.gethURL));

//checking connection to ethereum
if (!web3.isConnected()) {
    console.log("Couldn't connect to Ethereum");
} else {
    console.log("Connected to Ethereum");
}

exports.deployContract = (req, res) => {
    if (!req.params.uniqueId) return res.status(400).send({ message: 'Missing Req Unique Id' });
    console.log('Request to deploy Contract for ', req.params.uniqueId);

    Revenue.find({ uniqueId: req.params.uniqueId }, (err, revenue) => {
        let contractIdData = [], contractRateData = [];
        if (err) return res.status(500).send({ message: 'Failed to find Model' });
        for (param in revenue.Parameter) {
            if (param.isSlabPresent) {
                for (slab in param.slab) {
                    contractIdData.push(web3.fromAscii(slab.uniqueId)); // convert to bytes32
                    contractRateData.push(slab.rate);
                }
            }
            else if (param.isPostingDate || param.isEndOfSeasonFlag) {
                for (slab in param.date_slab) {
                    contractIdData.push(web3.fromAscii(slab.uniqueId)); //convertes to bytes32
                    contractRateData.push(slab.rate);
                }
            }
            else {
                contractIdData.push(web3.fromAscii(param.uniqueId)); //convertes to bytes32
                contractRateData.push(param.rate);
            }
        }
        //deploy contract
        console.log("Contract Deploy Values ", contractIdData, contractRateData);
        PersonalCalls.unlockAccount(allConfig.ethAdminAccount, allConfig.ethAdminPassword, 1000, (err, success) => {
            if (err) {
                return res.status(500).send({ message: 'Cannot unlock Account' });
            }
            web3.eth.defaultAccount = allConfig.ethAdminAccount;
            var obj = {
                retailerName: revenue.retailer_name,
                unique_id: contractIdData,
                rate: contractRateData
            }
            helper.deployContract(obj).then((result) => {
                //contract Deployed
                if (result.contractAddress) {
                    revenue.contractAddress = result.contractAddress;
                    revenue.save(function (err) {
                        if (err) { console.log('Error while saving contract Address to Model'); }
                    });
                }
            })
                .catch((err) => {
                    return res.status(500).send({ message: 'Failed to deploy contract' });
                })
        });

    });
}