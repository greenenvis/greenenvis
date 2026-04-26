export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <img
            src="/logo.png"
            alt="GreenEnvis Logo"
            className="h-14 mb-4"
          />
          <h1 className="text-3xl font-bold">Client Dashboard</h1>
          <p className="text-slate-500">
            Welcome to your compliance management portal
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Consent Status</h3>
            <p className="mt-2 text-slate-600">
              Active CTE / CCA Applications
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Expiry Alerts</h3>
            <p className="mt-2 text-slate-600">
              Upcoming renewal deadlines
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Documents Vault</h3>
            <p className="mt-2 text-slate-600">
              Upload & manage documents
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Payment Status</h3>
            <p className="mt-2 text-slate-600">
              Pending & completed invoices
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Support Ticket</h3>
            <p className="mt-2 text-slate-600">
              Raise complaint or support request
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Compliance Calendar</h3>
            <p className="mt-2 text-slate-600">
              Monthly and yearly compliance tracking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}