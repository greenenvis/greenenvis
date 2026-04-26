export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-green-700">GreenEnvis</h1>
            <p className="text-sm text-slate-500">
              Simplifying Environmental Compliance
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/login"
              className="border px-4 py-2 rounded-xl hover:bg-slate-100"
            >
              Client Login
            </a>

            <a
              href="https://wa.me/918780723063"
              target="_blank"
              className="bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              Free Consultation
            </a>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-semibold text-green-700 mb-2">
            GPCB • CPCB • COMPLIANCE
          </p>

          <h2 className="text-5xl font-bold leading-tight mb-6">
            Environmental Compliance Made Simple
          </h2>

          <p className="text-lg text-slate-600 mb-8">
            CTE, CCA, BMW Authorization, EPR, CGWA, Environmental Audit,
            Consent Renewals — All in One Smart Dashboard
          </p>

          <div className="flex gap-4">
            <a
              href="https://wa.me/918780723063"
              target="_blank"
              className="bg-green-600 text-white px-6 py-3 rounded-2xl"
            >
              Get Free Consultation
            </a>

            <a
              href="/dashboard"
              className="border px-6 py-3 rounded-2xl"
            >
              Client Dashboard
            </a>
          </div>
        </div>

        <div className="bg-slate-50 border rounded-3xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold mb-6">Quick Contact</h3>

          <div className="space-y-3 text-slate-600">
            <p>📞 8780723063</p>
            <p>✉️ info@greenenvis.com</p>
            <p>📍 Gujarat, India</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-10">Our Services</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "GPCB Consent (CTE / CCA)",
              "BMW Authorization",
              "EPR Registration",
              "Used Oil EPR",
              "Hazardous Waste Authorization",
              "CGWA Clearance",
              "Environmental Audit",
              "Stack Monitoring",
              "Water & Air Analysis",
            ].map((service) => (
              <div
                key={service}
                className="bg-white border rounded-2xl p-6 shadow-sm"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}