import { useState } from "react";

const GalleryFilter = () => {
  const [filterString, setFilterString] = useState("");

  // TODO pass data, do search/filter, show results
  const filterImages = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    console.log(e);
    console.log(formData);
    console.log(formJson);
    setFilterString(formData.get('filter'))
  };

  const inputText = (
    <label>
      <input
        type="text"
        name="filter"
        placeholder="Enter search term..."
        required
        className="bg-blue-100 m-1 p-1 italic"
      />
    </label>
  );

  const inputForm = (
    <form method="post" onSubmit={filterImages}>
      {inputText}
      <button
        className="bg-solid text-white p-1 italic font-sm"
        type="submit">Filter</button>
    </form>
  );

  return <div className="bg-blue-300">{inputForm}
      <h3 className=' italic'>↳ filtering for {filterString}</h3>
    </div>;
};

export default GalleryFilter;
