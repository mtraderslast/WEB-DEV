import React from 'react';

export default function PrivacyPolicy() {
    const lastUpdated = "August 2, 2026";

    return (
        <main className="w-full min-h-screen py-10 pt-32 px-4 sm:px-12 lg:px-24 transition-colors duration-300 bg-[#EDE8F5] dark:bg-[#000000] text-gray-800 dark:text-gray-200">

            {/* Container with clean text layout (No Cards) */}
            <div className="w-full space-y-10">

                {/* Header Section */}
                <header className="border-b border-gray-300 dark:border-gray-800 pb-8 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#3D52A0] dark:text-blue-400">
                        Legal & Compliance
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Privacy Policy
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Effective Date & Last Updated: {lastUpdated}
                    </p>
                </header>

                {/* Content Section */}
                <article className="space-y-8 text-base leading-relaxed text-justify">

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            1. Overview & Commitment to Data Privacy
                        </h2>
                        <p>
                            Our Software & IT Solutions company values your privacy above all else. This Privacy Policy outlines how we collect, process, store, and protect your personal and business data when you visit our website, submit quotation requests, order service packages (Basic, Professional, or Premium), or interact with our engineering and support teams.
                        </p>
                        <p>
                            By accessing our platform or submitting your information to request quotes and technical consultation, you consent to the data collection and operational practices described in this policy statement.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            2. Information We Collect
                        </h2>
                        <p>
                            To provide tailored IT services, execute software development projects, and maintain client communication, we gather necessary data across multiple customer touchpoints:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>
                                <strong>Contact Information:</strong> Full name, professional email address, phone number, company name, and physical office address.
                            </li>
                            <li>
                                <strong>Service & Quotation Requirements:</strong> Specific project scope details, functional requirements, technical specifications, preferred tier selections, and budget parameters submitted via our quotation forms.
                            </li>
                            <li>
                                <strong>Client Onboarding Credentials:</strong> Temporary API keys, server access credentials, brand assets, database connections, or third-party platform credentials intentionally provided by you for project execution.
                            </li>
                            <li>
                                <strong>Billing & Payment Information:</strong> Payment processing details, transaction references, and invoicing records necessary to process service orders securely.
                            </li>
                            <li>
                                <strong>Technical & Telemetry Data:</strong> IP address, browser type, device information, operating system, and analytical usage data gathered automatically via cookies during website visits.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            3. How We Use Your Information
                        </h2>
                        <p>
                            We adhere strictly to data minimization guidelines. Your information is processed exclusively for valid business and operational reasons:
                        </p>
                        <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>
                                <strong>Project Consultation & Communication:</strong> Reaching out directly to collect detailed project requirements, answer inquiry submissions, and conduct technical onboarding sessions.
                            </li>
                            <li>
                                <strong>Service Delivery & Custom Engineering:</strong> Building, deploying, and supporting custom web apps, mobile apps, e-commerce platforms, cloud architectures, AI tools, and automation solutions.
                            </li>
                            <li>
                                <strong>Order Processing & Contract Management:</strong> Managing subscription plans, processing payments, issuing invoices, and fulfilling Statement of Work (SOW) obligations.
                            </li>
                            <li>
                                <strong>Security & System Auditing:</strong> Detecting unauthorized access, preventing fraudulent billing transactions, and ensuring our web infrastructure remains secure.
                            </li>
                        </ol>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            4. Client Data Protection & Confidentiality
                        </h2>
                        <p>
                            We understand that project specifications, business automation workflows, and software codebases contain proprietary trade secrets. All client communications, source materials, and server credentials provided during active development are treated under strict non-disclosure terms.
                        </p>
                        <p>
                            We do not sell, rent, trade, or leak client data to external third-party advertisers or data brokers under any circumstances. Access to your sensitive access credentials and server infrastructures is restricted strictly to assigned engineers and project managers working on your specific account.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            5. Third-Party Service Providers
                        </h2>
                        <p>
                            To deliver high-availability software solutions, we integrate securely with trusted third-party providers, including payment processors, cloud hosting platforms (e.g., AWS, Vercel), email delivery gateways, and error-monitoring services.
                        </p>
                        <p>
                            These external service providers are granted access only to the minimal information necessary to perform their specialized infrastructure tasks and are bound by contract to uphold equal data protection standards.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            6. Data Security & Storage Standards
                        </h2>
                        <p>
                            We enforce multi-layered security measures to guard your information against unauthorized disclosure, interception, or loss. All network communications are encrypted in-transit using industry-standard Transport Layer Security (TLS/SSL).
                        </p>
                        <p>
                            Client access tokens, database passkeys, and sensitive production keys are stored using zero-trust encryption protocols and are purged or revoked immediately upon project offboarding and client sign-off.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            7. Your Rights & Data Choices
                        </h2>
                        <p>
                            Depending on your location, you hold full rights regarding the personal and technical data you entrust to us:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>
                                <strong>Access & Portability:</strong> You may request a complete export of the personal information stored in our systems.
                            </li>
                            <li>
                                <strong>Correction & Update:</strong> You hold the right to amend inaccurate contact details or updated business information.
                            </li>
                            <li>
                                <strong>Deletion & Erasure:</strong> You may request the deletion of your account records and stored project credentials upon project completion, provided there are no pending financial or legal obligations.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            8. Changes to This Privacy Policy
                        </h2>
                        <p>
                            We reserve the right to revise this Privacy Policy periodically to reflect technological updates, legal requirements, or adjustments in our service workflows. Any changes will be published directly on this page with an updated effective date.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            9. Contact Our Data Privacy Team
                        </h2>
                        <p>
                            If you have any privacy-related questions, data removal requests, or confidentiality inquiries, please reach out directly to our compliance officer via our official support channels or email.
                        </p>
                    </section>

                </article>
            </div>
        </main>
    );
}