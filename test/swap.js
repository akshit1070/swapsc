
const mytoken=artifacts.require('mytoken');
const swap=artifacts.require('swap');
require('chai')
  .use(require('chai-as-promised'))
  .should()

  function tokens(n){
      return web3.utils.toWei(n,'ether')
  }
contract('swap',(accounts)=>{
let myt,swa
  before(async()=>{
     myt=await mytoken.new()
     swa=await swap.new(myt.address)
     await myt.transfer(swa.address,tokens('1000000'))
  })
  describe('mytoken deployment', async ()=> {
      it('name',async()=>{
          const name=await myt.name()
          assert.equal(name,'mytoken')
      })
  })


  describe('swap deployment', async ()=> {
    it('name',async()=>{
        const name=await swa.name()
        assert.equal(name,'swapp')
    })
    it('swap has token',async()=>{

        let balance=await myt.balanceOf(swa.address)
        assert.equal(balance.toString(),tokens('1000000'))

     })
   })

   describe('allow to buy',async ()=>{
       //purchase token before
       let result
    before(async()=>{
     result=   await swa.buytoken({from: accounts[1], value: web3.utils.toWei('1','ether')})

     })
     it('person to buy token from swap',async ()=>{
      let inbal=await myt.balanceOf(accounts[1])
      assert.equal(inbal.toString(),tokens('100'))
      let swapbal
      swapbal=await myt.balanceOf(swa.address)
      assert.equal(swapbal.toString(),tokens('999900'))
      })
   })

   describe('allow to sell',async ()=>{
    //purchase token before
    let result
    before(async()=>{
      //to approve

      await myt.approve(swa.address,tokens('100'),{from : accounts[1]})
      result=   await swa.selltoken(tokens('100'),{from: accounts[1]})

   })
    it('person to sell token from swap',async ()=>{
      let inbal=await myt.balanceOf(accounts[1])
      assert.equal(inbal.toString(),tokens('0'))
      let swapbal
      swapbal=await myt.balanceOf(swa.address)
      assert.equal(swapbal.toString(),tokens('1000000'))
   })
})



})