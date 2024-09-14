export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="font-semibold text-4xl">Welcome to </div><div>Tailme 👋</div>
        <div className="mb-32 flex justify-center">
        </div>

        <button
          className="w-full bg-white text-gray-800 font-semibold py-3 px-4 rounded-full mb-8 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center"
        >
          Login with Google
        </button>

        {/* <button
          onClick={() => login("metamask")}
          className="w-full bg-white text-gray-800 font-semibold py-3 px-4 rounded-full mb-8 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <Image src={metamask} alt="metamask" className="mr-4" width={24} />
          Login with Metamask
        </button> */}
      </div>
    </div>
  );
}
