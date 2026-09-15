export const metadata = {
    title: "Portfolio",
    description: "Web Development & Digital Solutions Platform",
};

export default function Portfolio({ children }) {
    return (
        <section className="w-full h-full min-h-screen dark:bg-black">
            {children}
        </section>
    );
} 