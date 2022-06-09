import React, { useEffect } from "react";

export default function Meme() {

    const [meme, setMeme] = React.useState({
       
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"

    })
    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setMemeImage(data.data.memes))
    },[])

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name] : value
           
        }))
    }
    const [memeImage, setMemeImage] = React.useState([])

    function getMemeImage() {
        const NumRandom = Math.floor(Math.random() * memeImage.length)
        const urlMemeImage = memeImage[NumRandom].url
        setMeme(prevMeme =>({
                ...prevMeme,
                randomImage : urlMemeImage
            }))
        } 
    return (
        <main className="main--container">
            <form className="form--container">
                <input 
                    type="text"
                    className ="form--input"
                    placeholder="Texto superior"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange} 

                 />
                <input 
                    type="text" 
                    className ="form--input" 
                    placeholder="Texto inferior"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}    
                />
            </form>
            <button className="button"
                    onClick={getMemeImage}
            >
            Obtener imagen para Meme
            </button>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}