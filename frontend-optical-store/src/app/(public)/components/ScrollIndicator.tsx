export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 animate-bounce">
      <div className="w-10 h-10 rounded-full bg-gray-800 bg-opacity-70 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
