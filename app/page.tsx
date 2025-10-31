"use client";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  const HandleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d0f13]">
      <div className="bg-white/5 bacdrop-blur-md border border-white/10 p-8 rounded-lg">
        {/* // tracking wide - gives spaces between letters */}
        <h1 className="text-2xl font-bold text-center text-white mb-2 tracking-wide">
          Insight AI
        </h1>
        <p className="text-center mb-6 text-gray-400">
          AI-powered Stock sentiment dashbboard
        </p>
        <form onSubmit={HandleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username or Email"
            className="bg-transparent border border-gray-700 rounded px-3 py-1 foucs:outline-none focus:border-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent border border-gray-700 rounded px-3 py-1 focus:outline-none focus:border-gray-400"
          />
          <button
            type="submit"
            className="mt-2 bg-transparent border border-gray-600 rounded hover:bg-white/5 transition px-4 py-2 font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
