import beadyEyes from '../assets/beady-eyes.png'
import Button from "./_Button";

const Gallery = () => {

	// TODO: filepicker/upload
	 //
	 //
    const uploadFiles = () => {
        console.log('uploadFiles clicked')
    }

	const n = 6; // Or something else

	const img = <picture className='aspect-square w-16 bg-white'>
		<img src={beadyEyes} alt="" />
	</picture>;

	return (
		<div className="bg-green-200">
			<p className="">
				Gallery
			</p>
        <Button click={uploadFiles} style='bg-black' name='Upload' />
			<div className='columns-md gap-0'>
				{
					// create element n times
					// https://stackoverflow.com/questions/34189370/how-to-repeat-an-element-n-times-using-jsx-and-lodash
					[...Array(n)].map((e, i) => img)
				}
			</div>
		</div>
	);

}

export default Gallery
