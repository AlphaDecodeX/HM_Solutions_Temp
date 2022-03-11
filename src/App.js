import React from 'react'
import ScaleButton from './components/ScaleButton'
import styled from 'styled-components'
import { useRef, useEffect, useState } from 'react';
import "./App.css";

const Canvas = styled.div`
    margin: 50px auto;
    padding: 0;
    width: ${propss => propss.width}px;
    height: ${propss => propss.height}px;
    border: 2px solid black;
`;

function App() {
    const extractPosition = useRef(null);

    const ref = useRef(null);
    const refLeft = useRef(null);
    const refTop = useRef(null);
    const refRight = useRef(null);
    const refBottom = useRef(null);

    useEffect(() => {
        const resizeableEle = ref.current;
        const styles = window.getComputedStyle(resizeableEle);
        let width = parseInt(styles.width, 10);
        let height = parseInt(styles.height, 10);
        let x = 0;
        let y = 0;
    
        resizeableEle.style.top = "50px";
        resizeableEle.style.left = "50px";
    
        const onMouseMoveRightResize = (event) => {
          const dx = event.clientX - x;
          x = event.clientX;
          width = width + dx;
          resizeableEle.style.width = `${width}px`;
        };
    
        const onMouseUpRightResize = (event) => {
          document.removeEventListener("mousemove", onMouseMoveRightResize);
        };
    
        const onMouseDownRightResize = (event) => {
          x = event.clientX;
          resizeableEle.style.left = styles.left;
          resizeableEle.style.right = null;
          document.addEventListener("mousemove", onMouseMoveRightResize);
          document.addEventListener("mouseup", onMouseUpRightResize);
        };
    
        // Top resize
        const onMouseMoveTopResize = (event) => {
          const dy = event.clientY - y;
          height = height - dy;
          y = event.clientY;
          resizeableEle.style.height = `${height}px`;
        };
    
        const onMouseUpTopResize = (event) => {
          document.removeEventListener("mousemove", onMouseMoveTopResize);
        };
    
        const onMouseDownTopResize = (event) => {
          y = event.clientY;
          const styles = window.getComputedStyle(resizeableEle);
          resizeableEle.style.bottom = styles.bottom;
          resizeableEle.style.top = null;
          document.addEventListener("mousemove", onMouseMoveTopResize);
          document.addEventListener("mouseup", onMouseUpTopResize);
        };
    
        // Bottom resize
        const onMouseMoveBottomResize = (event) => {
          const dy = event.clientY - y;
          height = height + dy;
          y = event.clientY;
          resizeableEle.style.height = `${height}px`;
        };
    
        const onMouseUpBottomResize = (event) => {
          document.removeEventListener("mousemove", onMouseMoveBottomResize);
        };
    
        const onMouseDownBottomResize = (event) => {
          y = event.clientY;
          const styles = window.getComputedStyle(resizeableEle);
          resizeableEle.style.top = styles.top;
          resizeableEle.style.bottom = null;
          document.addEventListener("mousemove", onMouseMoveBottomResize);
          document.addEventListener("mouseup", onMouseUpBottomResize);
        };
    
        // Left resize
        const onMouseMoveLeftResize = (event) => {
          const dx = event.clientX - x;
          x = event.clientX;
          width = width - dx;
          resizeableEle.style.width = `${width}px`;
        };
    
        const onMouseUpLeftResize = (event) => {
          document.removeEventListener("mousemove", onMouseMoveLeftResize);
        };
    
        const onMouseDownLeftResize = (event) => {
          x = event.clientX;
          resizeableEle.style.right = styles.right;
          resizeableEle.style.left = null;
          document.addEventListener("mousemove", onMouseMoveLeftResize);
          document.addEventListener("mouseup", onMouseUpLeftResize);
        };
    
        // Add mouse down event listener
        const resizerRight = refRight.current;
        resizerRight.addEventListener("mousedown", onMouseDownRightResize);
        const resizerTop = refTop.current;
        resizerTop.addEventListener("mousedown", onMouseDownTopResize);
        const resizerBottom = refBottom.current;
        resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
        const resizerLeft = refLeft.current;
        resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);
    
        return () => {
          resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
          resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
          resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
          resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
        };
      }, []);

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

            <div className="container">
                <div ref={ref} className="resizeable">
                    <div ref={refLeft} className="resizer resizer-l"></div>
                    <div ref={refTop} className="resizer resizer-t"></div>
                    <div ref={refRight} className="resizer resizer-r"></div>
                    <div ref={refBottom} className="resizer resizer-b"></div>
                    <div style={{
                            backgroundColor:"white", 
                            color:"black", 
                            overflow:"auto",
                            }}>
                            Hello I am container here
                        </div>
                </div>
                </div>

        </div>
    )
}

export default App
