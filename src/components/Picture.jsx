const Picture = (props) => {
  return (
    <div className="bg-white p-2 w-36">
      <img className="aspect-square" src={props.data.src} alt={props.data.alt} />
    </div>
  );
};

export default Picture;
