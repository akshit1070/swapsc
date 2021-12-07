//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./mytoken.sol";


contract swap{
    string public name="swapp";
    mytoken public token;
    uint256 public rate=100;
   
   //constructor
    constructor(mytoken _token){
     token=_token;
    }

    event TokensPur(
     address indexed account,
     address indexed token,
     uint256 amount,
     uint256 price);
   
   
    event buyf(
     address indexed account,
     uint256 amount
     );

     event tokensold(
     address indexed account,
     address indexed token,
     uint256 amount,
     uint256 price 
     );


    function buytoken() public payable{
        //eth*no. of token receive per ether (also use pure or zeepline)
        uint256 tokena = msg.value * rate;
        //token av
        require(token.balanceOf(address(this)) >= tokena);

       bool res = token.transfer(msg.sender, tokena);
       if(res)
       {
       emit TokensPur(msg.sender, address(token), tokena, rate);
       }
       else
       {
       emit buyf(msg.sender, tokena);
       }      
    }


    function selltoken(uint256 _amount)public  {
    
    require(token.balanceOf(msg.sender)>=_amount);

    uint256 ethe= _amount/rate;
    require(address(this).balance>=ethe);
  
    //sending coin
     token.transferfrom(msg.sender,address(this), _amount);
    //ether tranfer function
     payable(msg.sender).transfer(ethe);

     emit tokensold(msg.sender,address(token),_amount,rate);
    }

    

  
}