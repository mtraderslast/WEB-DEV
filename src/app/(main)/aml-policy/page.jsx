import React from 'react';

export default function AMLPolicy() {
    const lastUpdated = "August 2, 2026";

    return (
        <main className="w-full min-h-screen py-10 pt-32 px-4 sm:px-12 lg:px-24 transition-colors duration-300 bg-[#EDE8F5] dark:bg-[#000000] text-gray-800 dark:text-gray-200">

            {/* Container with clean text layout (No Cards) */}
            <div className="w-full space-y-10">

                {/* Header Section */}
                <header className="border-b border-gray-300 dark:border-gray-800 pb-8 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#3D52A0] dark:text-blue-400">
                        Compliance & Legal Regulations
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Anti-Money Laundering (AML) Policy
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Effective Date & Last Updated: {lastUpdated}
                    </p>
                </header>

                {/* Content Section */}
                <article className="space-y-8 text-base leading-relaxed text-justify">

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            1. Commitment to Regulatory Compliance
                        </h2>
                        <p>
                            Our Software & IT Solutions company strictly prohibits and actively guards against any involvement in money laundering, financial terrorism, fraudulent payment processing, or illegally funded digital transactions. We are committed to adhering to international Anti-Money Laundering (AML) standards, Know Your Customer (KYC) directives, and global financial compliance frameworks.
                        </p>
                        <p>
                            This AML Policy applies to all clients, enterprise accounts, software package subscriptions, custom project quotations, and financial transactions conducted with our organization.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            2. Know Your Customer (KYC) & Verification
                        </h2>
                        <p>
                            To ensure all payments originate from legitimate business entities and verified financial sources, we enforce Customer Due Diligence (CDD) procedures prior to executing custom software agreements or enterprise service deliveries:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>
                                <strong>Identity & Business Verification:</strong> Clients purchasing enterprise service packages or requesting custom quotations may be required to verify their corporate registration, taxpayer identification, and primary contact details.
                            </li>
                            <li>
                                <strong>Payment Source Authorization:</strong> We require that all payments (via credit cards, bank wire transfers, or digital payment gateways) strictly match the identity of the contracting client or registered business entity.
                            </li>
                            <li>
                                <strong>Third-Party Payment Restrictions:</strong> Payments submitted by unverified third-party individuals on behalf of a client without prior legal disclosure are subject to immediate flag, hold, or verification review.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            3. Suspicious Activity Monitoring & Transaction Auditing
                        </h2>
                        <p>
                            Our finance and compliance teams continuously monitor incoming transactions for irregular financial behavior, unauthorized payment attempts, and potential money laundering patterns. Suspicious indicators include, but are not limited to:
                        </p>
                        <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>
                                Unusual, excessive overpayments followed by immediate requests for cash or wire refunds to a different payment source.
                            </li>
                            <li>
                                Requests to split invoices across multiple unverified credit cards or high-risk accounts without clear business necessity.
                            </li>
                            <li>
                                Structuring payments to intentionally bypass standard identity verification thresholds or banking limits.
                            </li>
                        </ol>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            4. Sanctions & High-Risk Jurisdictions
                        </h2>
                        <p>
                            We comply with international financial sanctions lists and government regulatory authorities. We do not engage in business relationships, deliver software solutions, or accept payments originating from individuals or entities operating in comprehensively sanctioned jurisdictions or designated sanctioned individuals lists (e.g., OFAC lists).
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            5. Record Keeping & Regulatory Reporting
                        </h2>
                        <p>
                            In accordance with financial compliance standards, we maintain complete records of client contracts, invoices, proof of payments, and communication histories for a minimum statutory period. In the event of confirmed financial fraud or suspicious activities, we reserve the right to report relevant transaction records to financial regulatory authorities and law enforcement agencies as required by law.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            6. Contact & Compliance Inquiries
                        </h2>
                        <p>
                            For questions regarding our financial compliance practices, identity verification processes, or AML inquiries, please contact our legal compliance department through our official support portal.
                        </p>
                    </section>

                </article>
            </div>
        </main>
    );
}