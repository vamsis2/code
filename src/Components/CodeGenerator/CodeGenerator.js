import React, {useRef, useState } from 'react'
import "./CodeGenerator.css"
import logo from "../Asstes/cat.jpg"


const CodeGenerator = () =>{
    const[image_url,setImage_url] = useState("/");
    let inputRef=useRef(null)
    const[loading,setLoading]=useState(false);
    const CodeGenerator= async () =>{
        if(inputRef.current.value===""){
            return 0;
        }
        setLoading(true);
        const response =  await fetch(
           "https://api.openai.com/v1/images/generations",
           {
             method:"POST",
             headers:{
                "content-Type":"application/json",
                Authorization:
                "Bearer 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",
               "User-Agent":"Chrome",
             },
             body:JSON.stringify({
                prompt:`${inputRef.current.value}`,
                n:1,
                size:"512x512",
             }),

           }
            
        );
        
        let data = await response.json();
    console.log(data);
        let data_array = data.data;
        setImage_url(data_array[0].url)
        
        setLoading(false);
       
    }
    return (
        <div className='ai-code-generator'>
              <div className='header'>Ai-code-editor <span>Generator</span></div>
              <div className='img-loading'>
              <div className='image'>
              <img src={image_url==="/"?logo:image_url} alt="" /></div>
              <div className="loading">
                <div className={loading?"loading-bar-full":"loading-bar"}>
                    <div className={loading?"loading-text":"display-none"}>Loading....
                    </div>
             </div>
              </div>
              </div>
              <div className='search-box'><input type='text' ref={inputRef} className='search-input' placeholder='Describe what you want'/>
              <div className='generate-btn' onClick={()=>{CodeGenerator()}}>Generate</div>
              </div> 
        </div>
        
    )
}

export default CodeGenerator;