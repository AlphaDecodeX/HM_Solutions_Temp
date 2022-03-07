import React, { useEffect, useState, useRef } from 'react'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import styled from 'styled-components';

const Button = styled.button`
    position: absolute;
    padding: 5px;
    border-radius: 50%;
    border: none;
    top: calc(${propss => propss.top}px - ${propss => propss.offsetY}px);
    left: calc(${propss => propss.left}px - ${propss => propss.offsetX}px);
    cursor: se-resize;
`;

function ScaleButton(props) {
    const extractPosition = useRef(null);
    const [position, setPosition] = useState({
        offsetX: 0,
        offsetY: 0
    });

    const [counter, setCounter] = useState(0.1);
    // const intervalRef = useRef(null);

    const move = (e) => {
        // console.log("Move", e.movementX, e.movementY);
        props.scaleDiv([e.movementX, e.movementY]);
    }

    const startCounter = (e) => {
        console.log("Holding Mouse");
        if (extractPosition.current) return;
        extractPosition.current = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
        }, 10);
        const el = e.target;
        el.addEventListener('mousemove', move);
    };

    const stopCounter = (e) => {
        if (extractPosition.current) {
            clearInterval(extractPosition.current);
            extractPosition.current = null;
        }
        const el = e.target;
        el.removeEventListener('mousemove', move);
    };

    useEffect(() => {
        const element = extractPosition.current;
        const dims = element.getBoundingClientRect();
        // console.log("Button dims are ", dims);
        setPosition({
            offsetX: dims.width / 2,
            offsetY: dims.height / 2
        });
        // console.log("Button offsets are : ", position.offsetX, position.offsetY);

    }, [position.offsetX, position.offsetY]);

    return (
        <Button left={props.right} top={props.bottom} ref={extractPosition}
            offsetX={position.offsetX} offsetY={position.offsetY} onMouseDown={startCounter}
            onMouseUp={stopCounter}>
            <ZoomOutMapIcon />
        </Button>
    )
}

export default ScaleButton