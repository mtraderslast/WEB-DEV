export const metadata = {
    title: "About Us",
    description: "Web Development & Digital Solutions Platform",
};

export default function About({ children }) {
    return (
        <section className="w-full h-full min-h-screen dark:bg-black">
            {children}
        </section>
    );
} 