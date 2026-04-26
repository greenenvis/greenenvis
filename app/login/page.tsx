export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 border">
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="GreenEnvis Logo"
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold">Client Login</h1>
          <p className="text-slate-500 mt-2">
            Access your compliance dashboard
          </p>
        </div>

        <form className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-xl p-4"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl p-4"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl border shadow font-medium"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">
            Forgot Password? Contact Admin
          </p>
        </div>
      </div>
    </div>
  );
}