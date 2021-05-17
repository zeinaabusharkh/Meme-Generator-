import { render } from "@testing-library/react"
import React, { Component } from "react"
import "./style.css"
class MemeGenerator extends Component
{
    constructor(){
        super()
        this.state={
            topText:"",
            bottomText:"",
            randomImg:"",
            allMemeImgs:[]


        }
        this.handleChange=this.handleChange.bind(this)
        this.RandomImage =this.RandomImage.bind(this)
    }

    
    componentDidMount()
    {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response=>{
            const {memes}= response.data
            console.log(memes)
            this.setState({allMemeImgs:memes})
        })
       
    }
    handleChange(event)
    {
        const {name, value}= event.target
        this.setState({ [name]:value })
    }

    
    RandomImage(event)
    {
        const {allMemeImgs , randomImg} =this.state
        const max = allMemeImgs.length
        const rand = Math.floor(Math.random() * max)
        this.setState({randomImg:allMemeImgs[rand].url})
        event.preventDefault();
       
    }
    
    render(){
    return ( 
    <div>
        <form className="meme-form">
            <input type="text" name="topText" value={this.state.topText} placeholder="top text" onChange={this.handleChange}/>
            <input type="text" name="bottomText" value={this.state.bottomText} placeholder="bottom text" onChange={this.handleChange} />
            <button onClick={this.RandomImage}> Gen </button>
        </form>
        <div className="meme">
            <img src={this.state.randomImg} alr="dont worry:)"/>
            <h2 className="top">{this.state.topText}</h2>
            <h2 className="bottom">{this.state.bottomText}</h2>

        </div>
    </div>
    )}
}

export default MemeGenerator ;