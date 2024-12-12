import Image from 'next/image';
import FallingObjects from '@/components/404/FallingObjects';

const Cat404 = ({ onGoBack }: { onGoBack: () => void }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[#fff4d1] overflow-hidden">
            <div className="flex-grow flex justify-center items-center relative">
                <FallingObjects emoji="🐟" interval={400} />
                <div className="text-center max-w-[900px] p-[20px_30px] border-[5px] border-[#FF7F50] rounded-[10px] bg-[#FFE99D] shadow-[0_4px_10px_rgba(0,0,0,0.1)] relative z-10">
                    <p className="text-5xl text-[#FF6347] m-0">CAT LOST !</p>
                    <p className="text-2xl mt-4 text-[#666]">Oops! The page you're looking for is lost in catnip.</p>
                    <Image src="/img/catsit.gif" alt="Cute Cat Animation" width={300} height={300} className="mx-auto my-4" />
                    <p className="text-lg text-[#333] text-center mt-4">
                        The cat has escaped from the website and we are looking for it!
                    </p>
                    <button
                        className="inline-block py-3 px-8 text-xl text-white bg-[#FF7F50] border-none rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#FF6347] mt-4"
                        onClick={onGoBack}
                    >
                        Go Back
                    </button>
                    <div className="flex justify-center mt-5">
                        {['404', 'CAT', 'NOT', 'FOUND'].map((text, index) => (
                            <div
                                key={index}
                                className="text-3xl text-[#FF6347] p-[10px_20px] mx-[5px] bg-[#FFE99D] border-[2px] border-dashed border-[#FF6347] rounded-[5px] cursor-pointer shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] transform rotate-0 transition-transform duration-200 ease-in-out hover:rotate-[10deg] active:rotate-[-5deg]"
                            >
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cat404;

