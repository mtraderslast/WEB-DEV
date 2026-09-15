import AuthAnimation from "@/components/AuthAnimation";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
    title: "Auth - Trade Chain",
    description: "Secure login and registration",
};

function AuthLayout({ children }) {
    return (
        <div className="auth-container min-h-screen bg-white dark:bg-black transition-colors duration-300">
            {/* Theme Toggle */}
            <div className="fixed top-2 right-6 z-50">
                <ThemeToggle />
            </div>
            <main className="w-full flex items-center justify-center">
                <div className="w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default AuthLayout;