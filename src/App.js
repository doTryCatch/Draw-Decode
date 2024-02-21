import React, { useState } from 'react';
import Canvas from './component/canvas';

const App = () => {
  const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
    'black',
    'white',
    'gray',
    'cyan'
 
];
const [currentColor,setColor]=useState("black")
const handle_color_change=(e)=>{
  
}
    return (
        <div className=" flex justify-center  bg-slate-500">
          <div className="canvas-container text-center">
            
          <h1>Draw & Guess Game</h1>
          <div className="toolBar flex">
            <div className="curr w-12 m-3" style={{backgroundColor: `${currentColor}`}}>

            </div>
          <div className="color-container grid grid-cols-6 gap-1">
          {colors.map((elem,index)=>(
           <div className="color h-8 w-8 rounded-full " style={{backgroundColor: `${elem}`}} key={index}  data-color={elem} onClick={e => {setColor(e.target.getAttribute('data-color'))}}></div>

))}


  </div>
           
          </div>
          
            <Canvas color={currentColor}/>
          </div>
         
        </div>
    );
};

export default App;
