import React from 'react';

export default function TermsAndConditions() {
    const lastUpdated = "August 2, 2026";

    return (
        <main className="w-full min-h-screen py-10 pt-30 px-4 sm:px-12 lg:px-24 transition-colors duration-300 bg-[#EDE8F5] dark:bg-[#000000] text-gray-800 dark:text-gray-200">

            {/* Container with clean text layout (No Cards) */}
            <div className="w-full space-y-10">

                {/* Header Section */}
                <header className="border-b border-gray-300 dark:border-gray-800 pb-8 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#3D52A0] dark:text-blue-400">
                        Legal Agreement
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Terms & Conditions
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Effective Date & Last Updated: {lastUpdated}
                    </p>
                </header>

                {/* Content Section */}
                <article className="space-y-8 text-base leading-relaxed text-justify">

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            1. Introduction & Acceptance of Terms
                        </h2>
                        <p>
                            Welcome to our Software & IT Solutions platform. These Terms & Conditions govern your access to and use of our website, services, applications, software products, and consulting offerings. By placing an order, filling out a quotation form, purchasing a service package, or subscribing to any of our digital solutions, you agree to be bound by these legal terms in their entirety.
                        </p>
                        <p>
                            If you do not agree with any portion of these terms, you are requested to immediately cease using our services and website. We reserve the right to alter, modify, or update these terms at any given time without prior explicit notice. Your continued utilization of our solutions following any amendments signifies your full acceptance of the updated Terms & Conditions.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            2. Scope of IT Services & Deliverables
                        </h2>
                        <p>
                            Our agency provides a wide range of professional technology services, including but not limited to Web Development, Mobile Application Engineering, E-Commerce Solutions, UI/UX Design, Search Engine Optimization (SEO), Cloud Infrastructure & DevOps, Business Process Automation, IT Consulting, and AI-Driven Automation Services.
                        </p>
                        <p>
                            Services are provided either under standardized structured service packages or via custom quotations based on bespoke project scope requirements provided by the client.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            3. Service Packages, Custom Quotations & Onboarding
                        </h2>
                        <p>
                            To accommodate various business scales, we offer categorized service tiers across all our service offerings:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>
                                <strong>Basic Tier:</strong> Standardized, entry-level digital packages designed for startups and small enterprises with defined scope boundaries.
                            </li>
                            <li>
                                <strong>Professional Tier:</strong> Enhanced solutions suited for growing businesses requiring scalable architecture and comprehensive feature sets.
                            </li>
                            <li>
                                <strong>Premium Tier:</strong> Fully featured, high-performance enterprise solutions with dedicated support and tailored infrastructure setups.</li>
                        </ul>
                        <p>
                            In addition to preset packages, clients may submit custom project requests by filling out our Request a Quote form. Upon receiving a quote submission, our engineering and account teams contact the client directly to conduct detailed discovery sessions, gather functional requirements, define project milestones, and issue an official Statement of Work (SOW) prior to project initiation.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            4. Client Responsibilities & Information Collection
                        </h2>
                        <p>
                            Successful project execution heavily relies on client collaboration and timely communication. Once a service order is placed or a quotation agreement is finalized, the client agrees to promptly provide all required credentials, brand assets, source materials, functional guidelines, and access permissions necessary for our team to commence work.
                        </p>
                        <p>
                            Any delays caused by missing client inputs, delayed feedback, or failure to grant necessary access credentials will automatically adjust project completion timelines and milestone deadlines without penalty to our agency.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            5. Order Execution & Cancellation Policy
                        </h2>
                        <p>
                            An order is officially deemed "In Progress" once the initial payment or deposit is cleared, and work allocation has commenced within our engineering team. Clients may cancel an order prior to the formal initiation of engineering, design, or architecture work. Once active development, strategic planning, or design layout creation has begun, orders cannot be arbitrarily canceled by the client without forfeiting the associated service fees.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            6. Payment Terms, Refund Eligibility & 24-Hour Refund Guarantee
                        </h2>
                        <p>
                            Due to the bespoke nature of digital software development and allocated technical resource costs, fees paid for active projects are strictly non-refundable once development or setup has commenced.
                        </p>
                        <p>
                            However, we guarantee full protection for client investments under two specific technical exceptions:
                        </p>
                        <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>
                                <strong>Failure to Deliver Agreed Scope:</strong> If our technical team fails to satisfy the functional requirements and deliverable specifications explicitly agreed upon in the approved Statement of Work (SOW) or package breakdown.
                            </li>
                            <li>
                                <strong>Project Deadline Breach:</strong> If our team fails to deliver the project within the mutually confirmed timeline due solely to internal delays and not client responsiveness delays.
                            </li>
                        </ol>
                        <p>
                            In either of these verified cases, the client reserves the complete right to formally demand a full refund. Once a valid refund request is confirmed by our management team, the full refunded amount will be processed and returned to the client's original payment method within exactly <strong>24 Hours</strong>.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            7. Intellectual Property & Code Ownership
                        </h2>
                        <p>
                            All original source code, custom graphic assets, UI designs, databases, and digital documentation developed specifically for the client under a paid contract become the exclusive intellectual property of the client upon final account settlement and project completion.
                        </p>
                        <p>
                            Our agency retains ownership of core pre-existing framework modules, proprietary utility scripts, open-source libraries, and development tools utilized during construction, granting the client a perpetual, non-exclusive license to operate them within their delivered software solution.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            8. Limitation of Liability & Warranties
                        </h2>
                        <p>
                            While we adhere to industry-standard engineering practices and rigorous quality control, our services and software products are provided on an "as-is" and "as-available" basis following client acceptance. Under no circumstances shall our company, its engineers, or affiliates be held liable for indirect, incidental, consequential, or third-party financial damages resulting from operational downtime, hosting provider outages, or unauthorized third-party system breaches post-delivery.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            9. Contact & Support Information
                        </h2>
                        <p>
                            If you have any questions, formal inquiries, or compliance concerns regarding these Terms & Conditions, please contact our legal and support department directly through our official client portal or via email.
                        </p>
                    </section>

                </article>
            </div>
        </main>
    );
}