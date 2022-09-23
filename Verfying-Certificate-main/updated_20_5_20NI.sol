pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract Covid
{
    uint256 public count=0;
    uint256 public st1_count=0;
	uint256 public st2_count=0;
	uint256 public st3_count=0;
	uint256 public negative_count=0;
	uint256 public positive_count=0;
	uint256 public quarantine_count=0;
	uint256  discharge_count=0;
    address owner;
   
    
    
    modifier onlyOwner()
    {
         require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    constructor() public {
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
      //  emit OwnerSet(address(0), owner);
    }
    
    struct patient_details
    {
        uint256 uid;
        string name;
        uint256 age;
        string gender;
        uint256 mobile;
    	string date_of_admission;
		string date_of_discharge;
		bool status1;
		bool status2;
		bool status3;
		bool quarantine_staus;
		
    }
    
    mapping(uint256 => patient_details) public patients;
    
    function addPatient(string memory _name,uint256 _age,string memory _gender,uint256 _mobile,string memory _date_of_admission ) public onlyOwner
    {
       
       
       if(check_empty(_name,_age,_gender,_mobile,_date_of_admission))
       {
        incrementCount();
        patients[count]=patient_details(count,_name,_age,_gender,_mobile,_date_of_admission,'Yet to Enter on discharge',false,false,false,false);
       }
    }
    
    function check_empty(string memory _name,uint256 _age,string memory _gender,uint256 _mobile,string memory _date_of_admission) internal pure  returns(bool)
    {
        bytes memory ln=bytes(_name);
        bytes memory gen=bytes(_gender);
        bytes memory doa=bytes(_date_of_admission);
        if((ln.length!=0)&&(gen.length!=0)&&(doa.length!=0)&&(_age!=0)&& (_mobile!=0))
        {
            return true;
        }
    }
    
    function incrementCount() internal
    {
        count+=1;
    }
    
    function getPatient(uint256 id) public view returns(uint256,string memory,uint256,string memory,uint256,string memory,string memory,bool,bool,bool,bool)
    {
       patient_details memory p=patients[id] ;
        return (p.uid,p.name,p.age,p.gender,p.mobile,p.date_of_admission,p.date_of_discharge,p.status1,p.status2,p.status3,p.quarantine_staus);
    }
    
	
	function set_status1(uint256 id) public onlyOwner
	{
	    st1_count+=1;
		patients[id].status1=true;
	}
	
	function set_status2(uint256 id) public onlyOwner
	{
		if(!patients[id].status1)
		{
		st2_count+=1;
		}
		else
		{
		    st1_count+=1; 
		}
		patients[id].status2=true;
	
	}
	
	function set_status3(uint256 id) public onlyOwner
	{
		if(!patients[id].status2)
		{
		st3_count+=1;
		}
		else
		{
		 st1_count+=1;
		}
		patients[id].status3=true;
	}
	
	
   function get_st1_count() public view returns(uint256)
	{
	return st1_count;
	}



	function get_st2_count() public view returns(uint256)
	{
	return st2_count;
	}
	
	function get_st3_count() public view returns(uint256)
	{
	return st3_count;
	}
	
	function set_quarantine_status(uint256 id) public onlyOwner
	{
		if(!patients[id].quarantine_staus)
		{
		quarantine_count+=1;
		patients[id].quarantine_staus=true;
		}
	}
	
	
	function get_quarantine_count() public view returns(uint256)
	{
	return quarantine_count;
	}
	
    function set_date_of_discharge (uint256 id,string memory _date_of_discharge) public onlyOwner
	{
	    
		patients[id].date_of_discharge=_date_of_discharge;
		discharge_count+=1;
	}
	
   
     
   function negative_count_report()public view returns(uint256)
  {
 
      return count-positive_count;
   }
    
    
   
    function positive_report() public returns(uint256)
    {
        uint256 i;
        
               
        for(i=1;i<=count;i++)
        {
            if((patients[i].status1==true)||(patients[i].status2==true)||(patients[i].status3==true))
            {
                positive_count+=1;               
            }
            
        }
        return positive_count;
    }
 
}