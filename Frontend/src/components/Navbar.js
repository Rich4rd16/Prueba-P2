import React from 'react';

export default function Navbar() {
    // const imagen = require.context("../img/");
    return (
        <header className="bg-green-500">
            <div className="mx-auto max-w-screen-xl px-3 py-3 sm:px-1 lg:px-3 text-center">
                <div className="mt-8 flex items-center flex-col">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">Bienvenido de vuelta</h1>
                <p className="mt-1.5 text-sm text-white">
                Preparado para empezar con el pie derecho este día 🚀 !!!!
                </p>
                <br/>
                </div>
            </div>
        </header>
    )
}