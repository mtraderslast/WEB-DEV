'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { fetchPortfolios } from "@/lib/action/portfolio";
import PortfolioCard from "@/components/PortfolioCard";

const categories = [
    "All",
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "SEO Optimization",
    "Digital Marketing",
    "Cloud Solutions",
    "Business Automation",
    "IT Consulting",
    "AI Automation"
];

const PortfolioPage = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [searchInput, setSearchInput] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const loadPortfolios = async (currentPage, currentCategory, currentSearch) => {
        setLoading(true);
        try {
            const params = { page: currentPage, limit: 12 };

            if (currentCategory !== "All") {
                params.category = currentCategory;
            }
            if (currentSearch) {
                params.search = currentSearch;
            }

            const response = await fetchPortfolios(params);

            if (response?.success) {
                const newData = response.data;
                const meta = response.meta;

                if (currentPage === 1) {
                    setPortfolios(newData);
                } else {
                    setPortfolios(prev => [...prev, ...newData]);
                }

                if (currentPage >= meta.totalPage || newData.length === 0) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            }
        } catch (error) {
            console.error("Failed to fetch portfolios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPortfolios(page, selectedCategory, appliedSearch);
    }, [page, selectedCategory, appliedSearch]);

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setPage(1);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setAppliedSearch(searchInput);
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-[#EDE8F5] dark:bg-[#000000] pt-30 py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative">

            {/* Background Grid - Added pointer-events-none */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#3D52A00d_1px,transparent_1px),linear-gradient(to_bottom,#3D52A00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Main Content - Added relative z-10 */}
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header Section */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                        Featured <span className="text-[#3D52A0]">Works</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        A showcase of my recent projects, blending functional design with scalable backend architectures.
                    </p>
                </motion.div>

                {/* Filter & Search Section */}
                <motion.div
                    className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                >
                    {/* Categories */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 flex-grow">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === cat
                                    ? "bg-[#3D52A0] text-white shadow-lg shadow-[#3D52A0]/30 border border-[#3D52A0]"
                                    : "bg-white dark:bg-[#09090b] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-[#3D52A0]/50 hover:text-[#3D52A0] dark:hover:text-[#3D52A0]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-80 flex-shrink-0">
                        <input
                            type="text"
                            placeholder="Search projects or tech..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-full bg-white dark:bg-[#09090b] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#3D52A0] focus:ring-1 focus:ring-[#3D52A0] transition-all shadow-sm"
                        />
                        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <button type="submit" className="hidden">Search</button>
                    </form>
                </motion.div>

                {/* No Data Found Message */}
                {!loading && portfolios.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No projects found</h3>
                        <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or category filter.</p>
                    </div>
                )}

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolios.map((portfolio, index) => (
                        <PortfolioCard
                            key={portfolio._id || index}
                            portfolio={portfolio}
                        />
                    ))}
                </div>

                {/* Loading / Load More State */}
                <div className="flex justify-center mt-16 h-12">
                    {loading && (
                        <div className="flex items-center gap-3 text-[#3D52A0]">
                            <span className="w-6 h-6 border-2 border-[#3D52A0] border-t-transparent rounded-full animate-spin"></span>
                            <span className="font-semibold tracking-wide">Loading projects...</span>
                        </div>
                    )}

                    {!loading && hasMore && portfolios.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setPage(prev => prev + 1)}
                            className="px-8 py-3 bg-transparent border-2 border-[#3D52A0] text-[#3D52A0] rounded-full font-bold hover:bg-[#3D52A0] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                        >
                            Load More Projects
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default PortfolioPage;