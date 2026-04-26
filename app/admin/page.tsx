export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <img
            src="/logo.png"
            alt="GreenEnvis Logo"
            className="h-14 mb-4"
          />
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-slate-500">
            Manage clients, compliance, and operations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Add New Client</h3>
            <p className="mt-2 text-slate-600">
              Create and manage client profiles
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Application Tracking</h3>
            <p className="mt-2 text-slate-600">
              Update CTE / CCA / Authorization status
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Document Management</h3>
            <p className="mt-2 text-slate-600">
              Upload approvals, reports, and files
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Invoice & Payment</h3>
            <p className="mt-2 text-slate-600">
              Track quotations, invoices, and payments
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Reminder System</h3>
            <p className="mt-2 text-slate-600">
              Manage renewal alerts and due dates
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Support Requests</h3>
            <p className="mt-2 text-slate-600">
              Handle client queries and tickets
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}