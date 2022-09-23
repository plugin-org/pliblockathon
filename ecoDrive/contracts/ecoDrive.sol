// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract EcoDrive {
    enum InsurancePeriod {
        TESTNOW,
        MONTH12,
        MONTH24
    }

    enum Status {
        PENDING,
        APPROVED,
        REJECTED,
        EXPIRED
    }

    address public contractOwner;
    uint256 public vehicleId;
    uint256 public insuranceId;
    uint256 public userId;
    uint256 public liquidityPool;
    uint256 private endDate;
    address payable public insuranceBuyer;
    Status public insuranceStatus = Status.PENDING;

    struct VehicleInfo {
        address payable vechicleOwner;
        uint256 vehicleId;
        string obdId;
        string vehicleRegNo;
        string vehicleType;
        uint256 yearOfManufacture;
        string fuelType;
        string chasisNumber;
    }

    struct InsuranceInfo {
        address payable insuranceHolder;
        uint256 vehicleId;
        uint256 insuranceId;
        uint256 endDate;
        Status status;
    }

    struct UserInfo {
        address payable userAddress;
        uint256 userId;
        string userName;
        string email;
        string country;
    }

    mapping(uint256 => VehicleInfo) public vehiclesDetail;
    mapping(uint256 => InsuranceInfo) public InsuranceDetail;
    mapping(uint256 => UserInfo) public userDetail;

    event buyInsuranceEvent(
        uint256 vehicleId,
        uint256 insuranceId,
        address payable insuranceBuyer,
        uint256 endDate
    );

    constructor() {
        contractOwner = msg.sender;
        liquidityPool = 1000 ether;
        vehicleId = 1;
        insuranceId = 1;
        userId = 1;
    }

    receive() external payable {}

    modifier onlyOwner() {
        require(
            contractOwner == msg.sender,
            "Access Forbidden. Only Contract Owner Can Access!"
        );
        _;
    }

    function addVehicle(
        string memory _vehicleRegNo,
        string memory _obdId,
        string memory _vehicleType,
        uint256 _yearOfManufacture,
        string memory _fuelType,
        string memory _chasisNumber
    ) public {
        vehiclesDetail[vehicleId] = VehicleInfo(
            payable(msg.sender),
            vehicleId,
            _obdId,
            _vehicleRegNo,
            _vehicleType,
            _yearOfManufacture,
            _fuelType,
            _chasisNumber
        );

        vehicleId += 1;
    }

    function addUser(
        string memory _userName,
        string memory _email,
        string memory _country
    ) public {
        userDetail[userId] = UserInfo(
            payable(msg.sender),
            userId,
            _userName,
            _email,
            _country
        );

        userId += 1;
    }

    function buyInsurance(uint256 _period) public payable {
        require(
            insuranceStatus == Status.PENDING,
            "Already purchased the Insurance"
        );

        if (InsurancePeriod.TESTNOW == InsurancePeriod(_period)) {
            endDate = block.timestamp + 50 seconds;
        } else if (InsurancePeriod.MONTH12 == InsurancePeriod(_period)) {
            require(
                msg.value == 5 ether,
                "Insufficient value, Please pay 50 XDC"
            );
            endDate = block.timestamp + 360 days;
        } else if (InsurancePeriod.MONTH24 == InsurancePeriod(_period)) {
            require(
                msg.value == 7 ether,
                "Insufficient value, Please pay 75 XDC"
            );
            endDate = block.timestamp + 720 days;
        }

        insuranceBuyer = payable(msg.sender);
        vehicleId -= 1;

        liquidityPool += msg.value;

        InsuranceDetail[insuranceId] = InsuranceInfo(
            insuranceBuyer,
            vehicleId,
            insuranceId,
            endDate,
            Status(1)
        );

        insuranceStatus = Status.APPROVED;

        insuranceId += 1;

        payable(address(this)).transfer(msg.value);

        emit buyInsuranceEvent(vehicleId, insuranceId, insuranceBuyer, endDate);
    }

    function rewardCalculation(uint256 _avgSpeed, uint256 _kmDriven)
        public
        pure
        returns (uint256)
    {
        uint256 reward;
        if (_avgSpeed <= 40) {
            reward = _kmDriven * 0.01 ether;
        } else if (_avgSpeed <= 50) {
            reward = _kmDriven * 0.09 ether;
        } else if (_avgSpeed <= 70) {
            reward = _kmDriven * 0.07 ether;
        } else if (_avgSpeed <= 90) {
            reward = _kmDriven * 0.01 ether;
        } else if (_avgSpeed > 90) {
            reward = 0 ether;
        }

        return reward;
    }

    function getReward(
        uint256 _insuranceId,
        uint256 _avgSpeed,
        uint256 _kmDriven
    ) public payable returns (uint256) {
        address payable insuranceHolder = InsuranceDetail[_insuranceId]
            .insuranceHolder;

        require(
            insuranceHolder == msg.sender,
            "Not a Insurance Owner, Please buy the insurance"
        );
        require(insuranceStatus == Status.APPROVED, "Please buy the insurance");

        uint256 myReward = rewardCalculation(_avgSpeed, _kmDriven);

        require(
            liquidityPool >= myReward,
            "Insufficient Liquidity Pool Balance!"
        );

        payable(msg.sender).transfer(myReward);

        liquidityPool -= myReward;

        return myReward;
    }

    // Accounting functions
    function addToBalance(uint256 _amount) public payable {
        address(this).call{value: _amount};
    }

    function getBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function withdrawAll() public onlyOwner {
        address payable to = payable(contractOwner);
        to.transfer(getBalance());
    }

    function withdrawAmount(uint256 amount) public onlyOwner {
        address payable to = payable(msg.sender);
        to.transfer(amount);
    }
}
