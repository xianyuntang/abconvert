import {
  MoisturizationIcon,
  PreventBreakageIcon,
  StrengthenIcon,
} from '../component/feature-icon';
import React from 'react';

export default function Home() {
  return (
    <div className="flex justify-center h-svh p-10">
      <div className="max-w-3xl mx-auto bg-yellow-50 p-6 rounded-lg shadow-md">
        <div className="flex items-center text-yellow-500 text-lg">
          <span className="mr-2">★★★★★</span>
          <span className="font-bold">25,000+ Happy Customers</span>
        </div>

        <h1 id="title" className="text-4xl font-bold my-4 text-gray-800">
          Chebe Hair Butter
        </h1>
        <div id="price" className="text-2xl text-gray-800 mb-4">
          $20
        </div>

        <ul
          id="description"
          className="list-disc list-inside mb-8 space-y-3 text-black"
        >
          <li>
            Perfect for hair <strong>moisturization, strength, growth</strong>
          </li>
          <li>
            Prevents <strong>split ends, breakage, dry hair</strong>
          </li>
          <li>
            <strong>Zero-water formula</strong> means your hair can absorb full
            benefits of organic, natural ingredients
          </li>
          <li>
            <strong>100% natural chebe powder</strong> extract from Africa
          </li>
          <li>
            Used by women from Africa for{' '}
            <strong>hair length and retention for centuries</strong>
          </li>
        </ul>

        <div className="grid grid-cols-3 gap-6 mb-8 text-black">
          <div id="feature-1" className="text-center">
            {/* <img src="/moisturization-icon.png" alt="Powerful Moisturization" className="w-12 mx-auto mb-2" /> */}
            <div className="flex flex-col items-center">
              <MoisturizationIcon />
              <p className="text-sm">Powerful Moisturization</p>
            </div>
          </div>
          <div id="feature-2" className="text-center">
            <div className="flex flex-col items-center">
              {/* <img src="/breakage-icon.png" alt="Prevent breakage and split ends" className="w-12 mx-auto mb-2" /> */}
              <PreventBreakageIcon />
              <p className="text-sm">Prevent breakage and split ends</p>
            </div>
          </div>
          <div id="feature-2" className="text-center">
            <div className="flex flex-col items-center">
              {/* <img src="/strengthen-icon.png" alt="Strengthen & lengthen hair" className="w-12 mx-auto mb-2" /> */}
              <StrengthenIcon />
              <p className="text-sm">Strengthen & lengthen hair</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg">
          <div className="flex justify-center mb-6">
            <button className="px-6 py-2 rounded-full bg-white font-bold text-gray-800 mr-4">
              One Time Purchase
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-200 font-bold text-gray-600">
              Subscribe & Save 20%
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center bg-white p-4 rounded-lg shadow-sm">
              <p className="font-bold text-lg text-black">8 oz</p>
              <p className="text-xl text-gray-800 mb-2">$20</p>
              <p className="text-sm text-gray-500">$2.50 per oz</p>
              <span className="inline-block mt-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
                Save 30%
              </span>
            </div>
            <div className="text-center bg-white p-4 rounded-lg shadow-sm">
              <p className="font-bold text-lg text-black">4 oz</p>
              <p className="text-xl text-gray-800 mb-2">$16</p>
              <p className="text-sm text-gray-500">$4.00 per oz</p>
            </div>
          </div>
        </div>
        <footer className="mt-12 text-center">
          <p className="text-gray-500 text-sm">Powered by ABConvert</p>
        </footer>
      </div>
    </div>
  );
}
