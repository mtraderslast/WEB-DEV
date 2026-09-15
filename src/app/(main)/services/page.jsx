import React from 'react'
import WebDevelopmentSection from './WebDevelopmentSection'
import MobileAppSection from './MobileAppSection'
import CloudSolutionsSection from './CloudSolutionsSection'
import ITConsultingSection from './ITConsultingSection'
import BusinessAutomationSection from './BusinessAutomationSection'
import AISolutionsSection from './AISolutionsSection'
import ServicesHero from './ServicesHero'
import PremiumCTA from './PremiumCTA'

function ServiceHome() {
    return (
        <section>
            <ServicesHero />
            <hr className="border-gray-300 dark:border-gray-600" />
            <WebDevelopmentSection />
            <hr className="border-gray-300 dark:border-gray-600" />
            <MobileAppSection />
            <hr className="border-gray-300 dark:border-gray-600" />
            <CloudSolutionsSection />
            <hr className="border-gray-300 dark:border-gray-600" />
            <ITConsultingSection />
            <hr className="border-gray-300 dark:border-gray-600" />
            <BusinessAutomationSection />
            <hr className="border-gray-300 dark:border-gray-600" />
            <AISolutionsSection />
            <PremiumCTA />
        </section>
    )
}

export default ServiceHome