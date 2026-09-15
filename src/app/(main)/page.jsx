import Hero from '@/components/Hero'
import ProcessSection from '@/components/ProcessSection'
import SpecializedServices from '@/components/SpecializedServices'
import WhyChooseUs from '@/components/WhyChooseUs'
import React from 'react'

function Home() {
    return (
        <main>
            <Hero />
            <SpecializedServices />
            <WhyChooseUs />
            <ProcessSection />
        </main>
    )
}

export default Home