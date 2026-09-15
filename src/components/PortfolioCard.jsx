// src/components/PortfolioCard.jsx
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const PortfolioCard = ({ portfolio }) => {
    const {
        title,
        description,
        category,
        technologies,
        projectUrl,
        thumbnailUrl,
        completionDate
    } = portfolio;

    const date = new Date(completionDate).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    });

    return (
        <motion.div
            className="group relative flex flex-col bg-white dark:bg-[#09090b] rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800/50 hover:border-[#3D52A0]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#3D52A0]/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Thumbnail & Hover Overlay */}
            <div className="relative h-60 w-full overflow-hidden">
                <img
                    src={thumbnailUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay with Button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                    <a
                        href={projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#3D52A0] text-white px-7 py-3 rounded-full font-medium transform translate-y-10 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#3D52A0]/80 shadow-lg"
                    >
                        View Project <FiExternalLink size={18} />
                    </a>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3D52A0] bg-[#3D52A0]/10 dark:bg-[#3D52A0]/20 px-3 py-1.5 rounded-full">
                        {category}
                    </span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {date}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
                    {title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="text-xs font-medium px-2.5 py-1 rounded-md bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default PortfolioCard;