import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="bg-blue-100 h-screen p-5 flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-bold text-gray-700 mb-4">Filters</h2>

                {/* Price Range */}
                <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-600">Price Range</h3>
                    <div className="flex space-x-2 mt-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">From</label>
                            <input className="w-20 border border-gray-300 rounded p-1" type="number" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">To</label>
                            <input className="w-20 border border-gray-300 rounded p-1" type="number" />
                        </div>
                    </div>
                    <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        Set
                    </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-600">Categories</h3>
                    <ul className="mt-2 space-y-2">
                        <li>
                            <Link to="/category/electronics" className="block text-gray-600 hover:text-blue-500">
                                Electronics
                            </Link>
                        </li>
                        <li>
                            <Link to="/category/clothing" className="block text-gray-600 hover:text-blue-500">
                                Clothing
                            </Link>
                        </li>
                        <li>
                            <Link to="/category/home-appliances" className="block text-gray-600 hover:text-blue-500">
                                Home Appliances
                            </Link>
                        </li>
                        <li>
                            <Link to="/category/books" className="block text-gray-600 hover:text-blue-500">
                                Books
                            </Link>
                        </li>
                        <li>
                            <Link to="/category/beauty" className="block text-gray-600 hover:text-blue-500">
                                Beauty Products
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Brands */}
                <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-600">Brands</h3>
                    <ul className="mt-2 space-y-2">
                        <li>
                            <input type="checkbox" id="brand1" className="mr-2" />
                            <label htmlFor="brand1" className="text-gray-600">Brand 1</label>
                        </li>
                        <li>
                            <input type="checkbox" id="brand2" className="mr-2" />
                            <label htmlFor="brand2" className="text-gray-600">Brand 2</label>
                        </li>
                        <li>
                            <input type="checkbox" id="brand3" className="mr-2" />
                            <label htmlFor="brand3" className="text-gray-600">Brand 3</label>
                        </li>
                        <li>
                            <input type="checkbox" id="brand4" className="mr-2" />
                            <label htmlFor="brand4" className="text-gray-600">Brand 4</label>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto">
                <p className="text-gray-500 text-sm">
                    Made by <Link to="" className="text-blue-500 hover:underline">Vignesh</Link>
                </p>
            </div>
        </div>
    );
};

export default SideBar;
