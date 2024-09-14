export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xs flex flex-col items-center pb-32">
        <div className="font-semibold text-4xl pb-2">Welcome to </div>
        <div className="font-semibold text-4xl pb-4">Tailme 👋</div>
        <div className="text-primary-900 text-center mt-2">Tail me and I will tell you</div>
      </div>

      <button className="w-full bg-primary-900 text-primary-0 font-semibold py-3 px-4 rounded-full mb-8 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center">
        Login with Google
      </button>
      <button className="w-full bg-primary-50 text-primary-900 font-semibold py-3 px-4 rounded-full mb-8 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center">
        About Us
      </button>
    </div>
  );
}
