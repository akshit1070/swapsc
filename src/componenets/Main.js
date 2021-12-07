import React, {Component} from 'react';
class Main extends Component{
  
    
  constructor(props){
    super(props)
    this.state={
      output:0,
     currentform:'buy'
    }}

    render(){
      if(this.state.currentform==='buy')
      {

        return (
            <div id="data" >
              <div className="d-flex justify-data-between mb-3">
                <button className ="btn btn-dark">
                  Buy
                </button>
                <button className ="btn btn-dark"
                onClick={(event)=>{
                  this.setState({currentform:'sell'})
                }}>
                  Sell
                </button>
                
              </div>
                <div className='card md-4'>
                    <div className='card-body'>
                        <form className='mb-3' onSubmit={(event)=>{
                            event.preventDefault()//to remain on the same
                            let ether
                            ether=this.input.value.toString()
                            ether=window.web3.utils.toWei(ether,'ether')
                            this.props.buytokens(ether)

                        }}>
                            <div>
                                <label className='float-left'><p>USER INPUT</p></label>
                                <span className='float-right text-muted'>
                                    Bal:{window.web3.utils.fromWei(this.props.ethbal)}
                                </span>
                            </div>
                            <div className='input-group mb-4'>
                                <input type='text' className='form-control form-control-lg'
                                  onChange={(event) => {
                                    const ether = this.input.value.toString()
                                    this.setState({
                                      output: ether * 100
                                    })
                                  }}
                                ref={(input) => { this.input = input }}
                                placeholder='0'required/>
                                
                                <div className='input-group-append'>
                                    <div className='input-group-text'> ETH
                                    </div>
                                  </div>  
                            </div>
                            <div>
                            <label className='float-left'><p>USER OUTPUT</p></label>
                            <span className='float-right text-muted'>
                                    Bal:{window.web3.utils.fromWei(this.props.tokenbal)}
                                </span>
                            </div>
                                <div className='input-group mb-4'>
                                 <input type='text' className='form-control form-control-lg' placeholder='0' value={this.state.output} disabled/>
                                 <div className='input-group-append'>
                                    <div className='input-group-text'> MYM
                                    </div>
                                  </div> 
                             </div>
                             <div className='mb-5'>
                             <span className='float-left text-muted'>Rate</span>
                             <span className='float-right text-muted'>1ETH=100MYM</span>
                             </div>
                             <button type='submit' className='btn btn-secondary btn-block btn-lg'>CONFIRM</button>


                        </form>

                    </div>

                </div>
            </div>
          );
        }

     else{

      return (
        <div id="data" >
           <div className="d-flex justify-data-between mb-3">
                <button className ="btn btn-dark"
                onClick={(event)=>{
                  this.setState({currentform:'buy'})
                }}>
                  Buy
                </button>
                <button className ="btn btn-dark">
                  Sell
                </button>


                </div>
            <div className='card md-4'>
                <div className='card-body'>
                    <form className='mb-3' onSubmit={(event)=>{
                        event.preventDefault()//to remain on the same
                        let ether
                        ether=this.input.value.toString()
                        ether=window.web3.utils.toWei(ether,'ether')
                        this.props.selltokens(ether)

                    }}>
                        <div>
                            <label className='float-left'><p>USER INPUT</p></label>
                            <span className='float-right text-muted'>
                            {/* window.web3.utils.fromWei */}
                                Bal:{window.web3.utils.fromWei(this.props.tokenbal)}
                            </span>
                        </div>
                        <div className='input-group mb-4'>
                            <input type='text' className='form-control form-control-lg'
                              onChange={(event) => {
                                const tokenam = this.input.value.toString()
                                this.setState({
                                  output: tokenam / 100
                                })
                              }}
                            ref={(input) => { this.input = input }}
                            placeholder='0'required/>
                            
                            <div className='input-group-append'>
                                <div className='input-group-text'> MYM
                                </div>
                              </div>  
                        </div>
                        <div>
                        <label className='float-left'><p>USER OUTPUT</p></label>
                        <span className='float-right text-muted'>
                                Bal:{ window.web3.utils.fromWei(this.props.ethbal)}
                            </span>
                        </div>
                            <div className='input-group mb-4'>
                             <input type='text' className='form-control form-control-lg' placeholder='0' value={this.state.output} disabled/>
                             <div className='input-group-append'>
                                <div className='input-group-text'> ETH
                                </div>
                              </div> 
                         </div>
                         <div className='mb-5'>
                         <span className='float-left text-muted'>Rate</span>
                         <span className='float-right text-muted'>100MYM=1ETH</span>
                         </div>
                         <button type='submit' className='btn btn-secondary btn-block btn-lg'>CONFIRM</button>


                    </form>
                </div>

            </div>
        </div>
      );
    }

     }






    

}
export default Main;
