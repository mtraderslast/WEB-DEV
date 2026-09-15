import { ArrowRight } from 'lucide-react'
import Link from 'next/link';

function PortfolioButton() {
    return (
        <Link
            href="/portfolio"
            className="relative inline-flex items-center justify-center overflow-hidden rounded-xl p-[2px] font-medium active:scale-95 transition-all duration-300 group shadow-lg shadow-[#3D52A0]/25 hover:shadow-[0_4px_20px_rgba(61,82,160,0.35)]"
        >
            {/* Animated Dual Gradient Layer */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#3D52A0] via-[#7088D6] to-[#3D52A0] bg-[length:200%_100%] bg-left transition-all duration-500 ease-out group-hover:bg-right" />

            {/* Button Inner Content */}
            <span className="relative flex items-center gap-3 px-7 py-3.5 rounded-[10px] text-white transition-all duration-300">
                <span>See Our Portfolio</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
        </Link>
    )
}

export default PortfolioButton