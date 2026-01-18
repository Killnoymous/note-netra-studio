
const FloatingLogo = () => {
    return (
        <div className="fixed top-8 left-8 z-50 animate-fade-in pointer-events-auto cursor-pointer">
            <div className="w-16 h-16 relative hover:scale-110 transition-transform duration-300">
                <img
                    src="/favicon.png"
                    alt="Kenet Technologies"
                    className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                />
            </div>
        </div>
    );
};

export default FloatingLogo;
