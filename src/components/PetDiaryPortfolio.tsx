import React from 'react';

const PetDiaryPortfolio: React.FC = () => {
    return (
        <main className="grid grid-cols-6 grid-rows-9 gap-4 p-8 font-sans font-bold text-[0.95vw]">
            <header className="col-start-5 col-end-7 row-start-1 row-end-2">
                <h1 className="text-[2.85vw] text-left">
                    Pet Diary<br />
                    Memories &<br />
                    Adventures
                </h1>
            </header>

            <h1 className="text-[15vw] text-center col-start-1 col-end-2 row-start-1 row-end-2 justify-self-start">
                fur
            </h1>

            <img
                src="https://www.onehealth.org/hubfs/blog/Tips-for-Choosing-the-Right-Pet-for-Your-Home-and-Lifestyle.jpeg"
                alt="Pet Moment 1"
                className="w-full h-full object-cover col-start-2 col-end-4 row-start-1 row-end-3"
            />

            <div className="col-start-4 col-end-5 row-start-2 row-end-3 self-end h-[12.6vw] flex items-end justify-center">
                <h1 className="text-[15vw] text-center">is</h1>
            </div>

            <img
                src="https://www.onehealth.org/hubfs/blog/Tips-for-Choosing-the-Right-Pet-for-Your-Home-and-Lifestyle.jpeg"
                alt="Pet Moment 2"
                className="w-full h-full object-cover col-start-5 col-end-6 row-start-2 row-end-3"
            />

            <img
                src="https://www.onehealth.org/hubfs/blog/Tips-for-Choosing-the-Right-Pet-for-Your-Home-and-Lifestyle.jpeg"
                alt="Pet Moment 3"
                className="w-full h-full object-cover col-start-1 col-end-3 row-start-3 row-end-5"
            />

            <img
                src="https://www.onehealth.org/hubfs/blog/Tips-for-Choosing-the-Right-Pet-for-Your-Home-and-Lifestyle.jpeg"
                alt="Pet Moment 4"
                className="w-full h-full object-cover col-start-3 col-end-5 row-start-3 row-end-5"
            />

            <img
                src="https://www.onehealth.org/hubfs/blog/Tips-for-Choosing-the-Right-Pet-for-Your-Home-and-Lifestyle.jpeg"
                alt="Pet Moment 5"
                className="w-full h-full object-cover col-start-5 col-end-6 row-start-3 row-end-4"
            />

            <h1 className="text-[15vw] text-center col-start-1 col-end-5 row-start-5 row-end-6">
                love
            </h1>

            <img
                src="https://www.onehealth.org/hubfs/blog/Tips-for-Choosing-the-Right-Pet-for-Your-Home-and-Lifestyle.jpeg"
                alt="Pet Moment 6"
                className="w-full h-full object-cover col-start-5 col-end-7 row-start-4 row-end-6"
            />

            <h1 className="text-[15vw] text-center col-start-1 col-end-2 row-start-6 row-end-8">
                that
            </h1>

            <img
                src="https://www.onehealth.org/hubfs/blog/Tips-for-Choosing-the-Right-Pet-for-Your-Home-and-Lifestyle.jpeg"
                alt="Pet Moment 7"
                className="w-full h-full object-cover col-start-2 col-end-4 row-start-6 row-end-8"
            />

            <img
                src="https://www.onehealth.org/hubfs/blog/Tips-for-Choosing-the-Right-Pet-for-Your-Home-and-Lifestyle.jpeg"
                alt="Pet Moment 8"
                className="w-full h-full object-cover col-start-4 col-end-5 row-start-6 row-end-7"
            />

            <img
                src="https://www.onehealth.org/hubfs/blog/Tips-for-Choosing-the-Right-Pet-for-Your-Home-and-Lifestyle.jpeg"
                alt="Pet Moment 9"
                className="w-full h-full object-cover col-start-4 col-end-5 row-start-7 row-end-8"
            />

            <p className="col-start-5 col-end-7 row-start-6 row-end-8 w-3/5 leading-[1.65] self-end">
                Pet Diary is a heartwarming collection of moments capturing the unconditional love, playful adventures, and unique personalities of our beloved furry friends. Each photograph tells a story of companionship, joy, and the unbreakable bond between pets and their humans.
            </p>

            <img
                src="https://www.onehealth.org/hubfs/blog/Tips-for-Choosing-the-Right-Pet-for-Your-Home-and-Lifestyle.jpeg"
                alt="Pet Moment 10"
                className="w-full h-full object-cover col-start-2 col-end-3 row-start-8 row-end-9"
            />

            <div className="col-start-4 col-end-5 row-start-8 row-end-9 self-end h-[12.6vw] flex items-end justify-center">
                <h1 className="text-[15vw] text-center">is</h1>
            </div>

            <style jsx>{`
        @media (max-width: 1080px) {
          main {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        @media (max-width: 880px) {
          main {
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>
        </main>
    );
};

export default PetDiaryPortfolio;