import React from 'react'
import ScaleButton from './components/ScaleButton'
import styled from 'styled-components'
import { useRef, useEffect, useState } from 'react';

const Canvas = styled.div`
    margin: 50px auto;
    padding: 0;
    width: ${propss => propss.width}px;
    height: ${propss => propss.height}px;
    border: 2px solid black;
`;

function App() {
    const extractPosition = useRef(null);

    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });

    const [wah, setWaH] = useState({
        width: 100,
        height: 100
    })

    const scaleDivHandler = (props) => {
        // console.log("Scale Div called", props);
        setWaH({
            width: wah.height + props[0],
            height: wah.width + props[1]
        })
    };

    useEffect(() => {
        const element = extractPosition.current;
        const dims = element.getBoundingClientRect();
        // console.log("Canvas Dims are : ", dims);
        setPosition({
            x: dims.right,
            y: dims.bottom
        })
    }, [position.x, position.y, wah.width, wah.height])

    return (
        <div>
            <Canvas ref={extractPosition} width={wah.width} height={wah.height}>
                Hello I am container here
                <ScaleButton right={position.x} bottom={position.y} scaleDiv={scaleDivHandler} />
            </Canvas>
            
    {/* edited */}
            <div style={{
                backgroundColor:"magenta", 
                color:"white", 
                // minWidth:"5rem", 
                width:"10rem",
                // minHeight:"5rem",
                height:"10rem", 
                resize:"both", 
                overflow:"auto",
                margin:"5rem",
                }}>
                Hello I am container here
            </div>

        </div>
    )
}

export default App
