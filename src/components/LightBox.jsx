import React from "react";
import { useState } from "react";

// TODO show picture description/data
// TODO allow edition of picture description/data
// MAYBE add download button

const LightBox = ({ children, data, Wrapper = "div", zIndex = 100 }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper onClick={toggleIsOpen}>
      {children}
      {isOpen ? (
        <div
          onClick={toggleIsOpen}
          className="mx-auto flex flex-col md:flex-row absolute top-0 left-0 w-screen h-screen z-50 cursor-pointer bg-black bg-opacity-75"
        >
          <img
            src={data.src}
            alt={data.alt}
            className="aspect-auto md:w-1/2 md:full place-self-center"
          />
          <div className="bg-white m-1 p-1 flex flex-col flex-wrap place-self-center">
            <p>{data.alt}</p>
            {data.solidImage.metadata.location ? (
              <div>
                <p>
                  Longitude: {data.solidImage.metadata.location?.longitude}{" "}
                </p>
                <p>Latitude: {data.solidImage.metadata.location?.latitude} </p>
              </div>
            ) : (
              <></>
            )}
            {data.solidImage.metadata.createdDate ? (
                <p>Created: {data.solidImage.metadata.createdDate?.toString()}</p>
            ) : (
              <></>
            )}

            {/*<p>{data.desc}</p>*/}
          </div>
        </div>
      ) : null}
    </Wrapper>
  );
};

export default LightBox;
