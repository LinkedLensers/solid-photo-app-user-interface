import beadyEyes from '../assets/beady-eyes.png'

const Gallery = () => {
	return (
		<div className="bg-green-200">
			<p className="">
				Gallery
			</p>
			<picture className='w-48 h-48'>
				<img src={beadyEyes} alt="" />
			</picture>
		</div>
	);

}

export default Gallery
