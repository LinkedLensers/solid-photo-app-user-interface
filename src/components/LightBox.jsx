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
				<div onClick={toggleIsOpen} style={{
					position: 'fixed',
					top: '0',
					left: '0',
					height: '100vh',
					width: '100vw',
					backgroundColor: 'rgba(0,0,0,0.7)',
					cursor: 'pointer',
					zIndex
				}}>
				  <img src={data.src}
						 alt={data.alt}
						style={{
							height: '100%',
							width: 'auto'
						}}
					/>
				</div>
				: null}
		</Wrapper>
	);
}

export default LightBox
