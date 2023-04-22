import beadyEyes from "../assets/beady-eyes.png";

const Picture = (props) => {
  // TODO: pass data: img + description
  const showImageDetails = () => {
    console.log("clicked image");
    console.log(props)
  };


return (
          <div className="bg-white p-2 w-36" onClick={showImageDetails}>
            <picture className="aspect-square">
              <img src={beadyEyes} alt="" />
            </picture>
          </div>
        )

}

export default Picture
