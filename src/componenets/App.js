import React, {Component} from 'react';
import Web3 from 'web3';
import Swap from '../abi/swap.json';
import Token from '../abi/mytoken.json';
import Navbar from './Navbar.js';
import Main from './Main.js';
class App extends Component{
 
  constructor(props){
    super(props)
    this.state={
      account:'0x0',
      ethbal:'0',
      walletLoaded:true,
      token:{},
      tokenbal:'0',
      swap:{},
      load:true
    }
  }

  async  componentDidMount(){
        await this.Web3l()
        await this.loadbdata()
    }



    async loadbdata(){
      //getting account
      const web3=window.web3
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      //getting eth bal in this account
      const ethbal=await web3.eth.getBalance(this.state.account)
      this.setState({ethbal})

      //loading token
      const id=await web3.eth.net.getId()
      const tdata=Token.networks[id]
      if(tdata){
      const token= new web3.eth.Contract( Token.abi , tdata.address  )
      this.setState({token})
      // console.log(this.state.token)
      //token balance
      let tokenbal = await token.methods.balanceOf(this.state.account).call();
      console.log('tokenbal',tokenbal.toString())
      this.setState({tokenbal:tokenbal.toString()})
    }
      else{
       window.alert('CONTRACT NOT DEPLOYED ON THIS')
      }


    
      //swap
      const swapdata=Swap.networks[id]
      if(swapdata){
      const swap= new web3.eth.Contract( Swap.abi , swapdata.address  )
      this.setState({swap})
     // console.log(this.state.swap)
      }
      else{
        window.alert('SWAP CONTRACT NOT DEPLOYED ON THIS')
       }
//set loading
       this.setState({load:false})
    }
    

    
   async Web3l(){
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
         
           this.setState({walletLoaded : true}); 
          }
          else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
            this.setState({walletLoaded : false}); 
          }
    }
    
    buytokens = async  (etherAmount) => {
       await this.state.swap.methods.buytoken().send({ value: etherAmount, from: this.state.account })
      
      }

      selltokens = async  (tokenAmount) => {
        await this.state.token.methods.approve(this.state.swap.options.address, tokenAmount).send({ from: this.state.account })
     
        await this.state.swap.methods.selltoken(tokenAmount).send({ from: this.state.account })        
        
 
       }
    

    render(){
      let data
      if(this.state.load)
      {
        data=<p id='load' className='text-center'>LOADING...</p>
      }
      else
      {
        data=<Main  ethbal={this.state.ethbal}
         tokenbal={this.state.tokenbal} 
         buytokens={this.buytokens}
         selltokens={this.selltokens}/>
      }
        return (
            <div>
              <Navbar account ={this.state.account}/>
              <div className="container-fluid mt-5">
                <div className="row">
                  <main role="main" className="col-lg-12 d-flex text-center">
                    <div className="content mr-auto ml-auto">
                      
                     <h1>MY SWAP</h1>
                      {data}
                    </div>
                  </main>
                </div>
              </div>
            </div>
          );
    }

}
export default App;
