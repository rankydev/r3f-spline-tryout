import Spline from '@splinetool/react-spline'
import { useRef, useState, useEffect } from 'react'

function Hero() {
   const [isReady, setIsReady] = useState(false);
    const [objectToAnimate, setObjectToAnimate] = useState(null);

    function onStart(spline) {
        const obj = spline.findObjectById('922db9d4-c2ac-42ef-b105-30e267b4e939');
        const rect = spline.findObjectById('93587a75-2031-4f95-915e-74c96c4ed16a')
        console.log(rect, obj)
        setObjectToAnimate(obj);
        setIsReady(true);
    }

    function triggerAnimation() {
        if (isReady && objectToAnimate) {
            objectToAnimate.emitEvent('mouseHover');
        }
    }
    return (
        <div className="hero">
            <Spline 
                scene="https://prod.spline.design/23ndnZuU83rBI2Gb/scene.splinecode" 
                onLoad={onStart}
            />
            <button onClick={triggerAnimation}>Start Animation</button>
        </div>
    )
}

export default Hero;

