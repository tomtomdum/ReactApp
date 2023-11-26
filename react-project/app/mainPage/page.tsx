import Link from 'next/link'
import React from 'react'

const MainPage = () => {
    return (
        <main>
            <div>Main page of the app</div>
            <Link href="/test/">About</Link>
        </main>

    )
}

export default MainPage