pragma solidity ^0.4.0;
contract Revenue_Contract {
    
    string public retailerName;
    mapping (bytes32 => uint) public ratePercent;
    uint public size_of_data;
    
    function Revenue_Contract(string _retailerName, bytes32[] _unique_id, uint [] _rate) {
        retailerName = _retailerName;
        size_of_data = 0;
        for(uint index = 0; index < _rate.length ;index++) {
            ratePercent[_unique_id[index]] = _rate[index];
            size_of_data = size_of_data + 1;
        }
    }
    
    function get_Rate_By_Id(bytes32 _uniqueId) constant returns(uint) {
        uint res = 0;
        res = ratePercent[_uniqueId];
        return res;
    }
    
    function update_Percent_Of_Id(bytes32 _uniqueId, uint revised_rate) payable {
         ratePercent[_uniqueId] = revised_rate;
    }
    
    function addAnotherRate(bytes32 _uniqueId, uint _rate) payable {
        ratePercent[_uniqueId] = _rate;
        size_of_data = size_of_data + 1;
    }
    
}

