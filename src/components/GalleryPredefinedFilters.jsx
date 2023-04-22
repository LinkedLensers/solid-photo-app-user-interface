
// Predefined filters/searches for dateAdded, tags, ...

const GalleryPredefinedFilters = () => {

  // TODO ideally we can just create an object with multiple filters and their names and then render them
  const buttonClick = () => alert('clicked predefined filter')

  const filterButton = (
    <button
      onClick={buttonClick}
      name='dateAdded'
      className='bg-purple-400 text-white pr-1 pl-1 italic font-sm border-solid border-white border-2 rounded-md'
    >Predefined Filter</button>
  )

  return (
    <div className='flex flex-row flex-wrap p-1'>
      {filterButton}
      {filterButton}
      {filterButton}
    </div>

  )

}

export default GalleryPredefinedFilters
