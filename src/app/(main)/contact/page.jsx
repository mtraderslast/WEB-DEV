import React from 'react'
import ContactSection from './ContactSection'
import ContactHero from './ContactHero'
import FaqSection from './FaqSection'

function ContactPage() {
    return (
        <main>
            <ContactHero />
            <ContactSection />
            <FaqSection />
        </main>
    )
}

export default ContactPage