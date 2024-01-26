import React from 'react';

const imagen = require.context("../img/");

export default function Footer() {
    return (
        <footer className="bg-green-500 rounded-lg shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-center">
            <a href="" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src={(imagen("./Logo.png"))} className="h-20" alt="Espe" />
            </a>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-white sm:text-center dark:text-gray-400">© 2024 <a href="" className="hover:underline">Albán Richard, Ipiales Carlos, Lazo Ricardo</a>. Todos los derechos reservados</span>
        </div>
        </footer>
    );
}
