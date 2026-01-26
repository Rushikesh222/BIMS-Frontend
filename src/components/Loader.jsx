export const Loader = ({ show }) => {
    if (!show) return null;
  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur background */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Spinner */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-sm font-medium">
          Please wait...
        </p>
      </div>
    </div>
    );
}
