import Image from "next/legacy/image";

export default function SpeakerProfile({
    imageURL,
    name,
    position,
    otherDescription,
}) {
    return (
        <div className='flex flex-col items-center'>
            <div className='flex justify-center items-center h-[170px] w-[170px] rounded-full bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500'>
                <div className='flex justify-center items-center h-[160px] w-[160px] rounded-full bg-white'>
                    <Image
                        src={imageURL}
                        width={150}
                        height={150}
                        objectFit='cover'
                        className='rounded-full'
                    />
                </div>
            </div>

            <div className='mt-4 text-center'>
                <p className='text-lg font-bold'>{name}</p>
                <p className='font-semibold text-blue-500'>{position}</p>
                <p className='italic text-gray-500'>{otherDescription}</p>
            </div>
        </div>
    );
}
