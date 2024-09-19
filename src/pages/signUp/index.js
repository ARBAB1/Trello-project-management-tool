import Image from "next/image";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function SignUp() {
  const router = useRouter();

  const handleSignInRedirect = () => {
    router.push("/");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 relative">
      {/* Left Image */}
      <div className="hidden lg:block absolute left-0 bottom-0">
        <Image
          src="/image1.png"
          alt="Left Side Image"
          width={400}
          height={400}
        />
      </div>

      {/* Right Image */}
      <div className="hidden lg:block absolute right-0 bottom-0">
        <Image
          src="/image2.png"
          alt="Right Side Image"
          width={400}
          height={400}
        />
      </div>

      {/* Center Sign-up Box */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm z-10">
        <div className="text-center mb-6">
          <Image
            src="/trello.png"
            alt="Trello Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h1 className="text-2xl font-semibold mt-4 text-black">
            Create your account
          </h1>
        </div>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <p>
            Already have an account?{" "}
            <button
              onClick={handleSignInRedirect}
              className="text-blue-500 hover:underline"
            >
              Sign in
            </button>
            
          </p>
        </div>
      </div>
    </main>
  );
}
