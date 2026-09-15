export const metadata = {
    title: "Terms & Conditions",
    description: "Web Development & Digital Solutions Platform",
};

export default function TermsConditions({ children }) {
    return (
        <section className="w-full h-full min-h-screen dark:bg-black">
            {children}
        </section>
    );
} 