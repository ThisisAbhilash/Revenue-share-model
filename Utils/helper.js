const allConfig = require('../Config/allConfig');

exports.deployContract = ({ retailerName, unique_id, rate }) => {
    return new Promise((resolve, reject) => {
        var _retailerName = retailerName; 
        var _unique_id = unique_id;
        var _rate = rate;
        var revenue_contractContract = web3.eth.contract(allConfig.contractABI);
        var revenue_contract = revenue_contractContract.new(
            _retailerName,
            _unique_id,
            _rate,
            {
                from: web3.eth.accounts[0],
                data: allConfig.contractData,
                gas: '4700000'
            }, function (e, contract) {
                console.log(e, contract);
                if (typeof contract.address !== 'undefined') {
                    console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                    resolve({contractAddress: contract.address, contractTxnHash: contract.transactionHash});
                }
            })
    });
}