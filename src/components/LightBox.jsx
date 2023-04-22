import React from 'react';
import { useState } from "react";

const LightBox = ({ children, data, Wrapper = 'div', zIndex = 100 }) => {
	const [isOpen, setIsOpen] = React.useState(false);
    console.log(data)

	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};

return (
		<Wrapper onClick={toggleIsOpen}>
			{children}
			{isOpen ?
				<div onClick={toggleIsOpen}
              className="absolute top-0 left-0 w-screen h-screen z-50 cursor-pointer bg-black">
				  <img src={data.src}
						 alt={data.alt}
                className="mx-auto h-full"
					/>
				</div>
				: null}
		</Wrapper>
	);
}

export default LightBox
