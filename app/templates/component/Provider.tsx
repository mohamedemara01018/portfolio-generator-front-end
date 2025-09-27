'use client';
import { store } from '@/RTK/store'
import React from 'react'
import { Provider } from "react-redux";


function ProviderStore({ children }: { children: React.ReactNode }) {
    return (

        <Provider store={store}>
            <main >
                {children}
            </main>
        </Provider>

    )
}

export default ProviderStore