import Link from "next/link";

export default function Landing() {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="max-w-[600px] w-full mx-auto px-4">
        <div className="w-full flex flex-col items-center mb-12">
          <div className="font-semibold text-4xl pb-2">Welcome to</div>
          <div className="font-semibold text-4xl pb-4">Tailme 👋</div>
          <div className="text-primary-900 text-center mt-2">
            Tail me and I will tell you
          </div>
        </div>

        <button className="w-full bg-primary-900 text-primary-0 font-semibold py-3 px-4 rounded-full mb-4 shadow-md hover:bg-primary-800 transition duration-300 ease-in-out flex items-center justify-center">
          <Link href="/home" className="w-full text-center">
            Login with Google
          </Link>
        </button>
        <button className="w-full bg-primary-50 text-primary-900 font-semibold py-3 px-4 rounded-full shadow-md hover:bg-primary-100 transition duration-300 ease-in-out flex items-center justify-center">
          About Us
        </button>
      </div>
    </div>
  );
}
