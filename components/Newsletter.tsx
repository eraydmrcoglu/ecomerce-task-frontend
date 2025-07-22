import Image from 'next/image';
import React from 'react'

export default function Newsletter() {
    return (
        <div className="md:grid md:grid-cols-2 max-w-4xl bg-white mx-4 md:mx-auto rounded-xl">
            <Image src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/newsletter/image.png" width={500} height={500}
                alt="newsletter" className="hidden md:block w-full max-w-lg rounded-xl" />
            <div className="relative flex items-center justify-center">
                <div className="max-md:py-20 px-6 md:px-10 text-center">
                    <h1 className="text-3xl font-bold">
                        Subscribe to our newsletter
                    </h1>
                    <p className="mt-4 text-gray-500">
                        Be the first to get the latest news about trends, promotions, and much more!
                    </p>
                    <form className="mt-8 flex">
                        <input type="email" placeholder="Your email address"
                            className="w-full outline-none rounded-l-md border border-r-0 border-gray-300 p-4 text-gray-900" />
                        <button type="submit" className="rounded-r-md bg-black px-7 py-2 text-white">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};