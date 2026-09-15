import React from 'react';

export default function RefundPolicy() {
    const lastUpdated = "August 2, 2026";

    return (
        <main className="w-full min-h-screen py-10 pt-32 px-4 sm:px-12 lg:px-24 transition-colors duration-300 bg-[#EDE8F5] dark:bg-[#000000] text-gray-800 dark:text-gray-200">

            {/* Container with clean text layout (No Cards) */}
            <div className="w-full space-y-10">

                {/* Header Section */}
                <header className="border-b border-gray-300 dark:border-gray-800 pb-8 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#3D52A0] dark:text-blue-400">
                        Billing & Guarantee Policy
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Refund Policy
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Effective Date & Last Updated: {lastUpdated}
                    </p>
                </header>

                {/* Content Section */}
                <article className="space-y-8 text-base leading-relaxed text-justify">

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            1. General Refund Overview
                        </h2>
                        <p>
                            This Refund Policy outlines the terms and conditions under which payments made for our software and IT solution packages—including Web Development, Mobile App Development, E-Commerce, UI/UX Design, SEO, Cloud Solutions, Business Automation, IT Consulting, and AI Services—are evaluated for refunds.
                        </p>
                        <p>
                            Due to the custom nature of software engineering, strategic resource allocation, and immediate team onboarding upon project kickoff, our standard policy dictates that all completed orders or active projects are non-refundable, except under specific, verified performance conditions outlined below.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            2. Pre-Development Order Cancellations
                        </h2>
                        <p>
                            Clients may purchase standard tiers (Basic, Professional, or Premium) or submit a custom quotation form. If a client decides to cancel an order after payment but <strong>before</strong> our engineering and design teams have commenced active work, initial consultation, or technical architecture setup, a full refund will be processed upon request.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            3. Non-Refundable Active Services
                        </h2>
                        <p>
                            Once project onboarding is complete, information is collected, and our development or design team begins active work on your project, payments become non-refundable. Work started cannot be un-done, as resources, server infrastructure costs, and developer hours are permanently allocated to your deliverables.
                        </p>
                        <p>
                            Requests for refunds based on subjective change of mind, internal business decisions, or failure to supply requested credentials and project information will not be accepted.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            4. Service Level Guarantees & Refund Eligibility
                        </h2>
                        <p>
                            We prioritize client satisfaction and deliverable excellence. Clients reserve the right to claim a complete refund if either of the following two specific breaches occur:
                        </p>
                        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                            <li>
                                <strong>Failure to Meet Project Scope Requirements:</strong> If the final delivered work fails to satisfy or match the core functional specifications and scope agreed upon in the package details or approved custom Statement of Work (SOW).
                            </li>
                            <li>
                                <strong>Unacceptable Delivery Timeline Delays:</strong> If our engineering team fails to complete and deliver the agreed milestones within the mutually confirmed timeline, provided the delay is caused solely by our agency and not due to delayed inputs or approvals from the client side.
                            </li>
                        </ol>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            5. Guaranteed 24-Hour Refund Execution
                        </h2>
                        <p>
                            If a client submits a valid refund claim based on scope failure or deadline breaches, our management team will review the project log and Statement of Work immediately.
                        </p>
                        <p>
                            Once the claim is verified and approved, we guarantee that the full refund amount will be dispatched and returned to the client's original payment method within exactly <strong>24 Hours</strong>.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-[#3D52A0] dark:border-blue-500 pl-4">
                            6. Dispute Resolution & Contact Information
                        </h2>
                        <p>
                            To initiate a refund request or discuss billing concerns, please contact our support team with your order ID, quotation reference, and detailed grounds for the claim. We aim to address all billing disputes swiftly and transparently.
                        </p>
                    </section>

                </article>
            </div>
        </main>
    );
}