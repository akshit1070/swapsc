const swap = artifacts.require("swap");
const mytoken = artifacts.require("mytoken");

module.exports =async function (deployer) {
  await deployer.deploy(mytoken);
  const token= await mytoken.deployed()
  
 await deployer.deploy(swap,token.address);
  const swa= await swap.deployed()

  //tranfer erc20 to swap
  await token.transfer(swa.address,'1000000000000000000000000')
};
