import {useRef, useState} from "react";

/* eslint-disable react/prop-types */
const BentoCard = ({src, title, description}) => {
    return (
        <div className="relative size-full">
            <video src={src} loop muted autoPlay className="absolute left-0 top-0 size-full" />
            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <h1 className="bento-title special-font">{title}</h1>
                {description && <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>}
            </div>
        </div>
    );
};

export const BentoTilt = ({children, className}) => {
    const [transfromStyle, setTransfromStyle] = useState("");
    const itemRef = useRef();
    const handleMouseMove = (e) => {
        if (!itemRef.current) return;
        const {left, top, width, height} = itemRef.current.getBoundingClientRect();
        //To get the relative difference between the mouse and the card.
        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;
        //For the tilt
        const tiltX = (relativeX - 0.5) * 30;
        const tiltY = (relativeY - 0.5) * -30;
        //For the transformation
        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.90, 0.90, 0.90) `;

        setTransfromStyle(newTransform);
    };
    const handleMouseLeave = (e) => {
        setTransfromStyle("");
    };

    return (
        <div
            className={className}
            ref={itemRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{transform: transfromStyle}}
        >
            {children}
        </div>
    );
};

export default BentoCard;
