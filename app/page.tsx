export default function GreenEnvisPortal() {
  const services = [
    "GPCB Consent (CTE / CCA)",
    "BMW Authorization",
    "EPR Registration",
    "Used Oil EPR",
    "Hazardous Waste Authorization",
    "CGWA Clearance",
    "Environmental Audit",
    "Stack Monitoring",
    "Water & Air Analysis",
    "Plastic Waste Authorization",
    "E-Waste Authorization",
    "STP / ETP Compliance",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <img
              src="/logo.png"
              alt="GreenEnvis Logo"
              className="h-14 w-auto"
            />
            <p className="text-sm text-slate-500 mt-1">
              Simplyflying Environmental Compliance
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-2 rounded-2xl border">
              Client Login
            </button>
            <button className="px-5 py-2 rounded-2xl shadow font-medium border">
              Free Consultation
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">
            GPCB • CPCB • Compliance
          </p>

          <h2 className="text-5xl font-bold leading-tight mt-3">
            Environmental Compliance Made Simple
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            CTE, CCA, BMW Authorization, EPR, CGWA, Environmental Audit,
            Consent Renewals — All in One Smart Dashboard.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 rounded-2xl border shadow">
              Get Free Consultation
            </button>
            <button className="px-6 py-3 rounded-2xl border">
              Client Dashboard
            </button>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 shadow-sm border">
          <h3 className="text-xl font-semibold mb-4">Quick Contact</h3>
          <div className="space-y-3 text-slate-700">
            <p>📞 8780723063</p>
            <p>📧 info@greenenvis.com</p>
            <p>📍 Gujarat, India</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-4">Why GreenEnvis?</h3>
          <p className="text-slate-600 max-w-4xl">
            We help industries manage pollution control approvals, renewals,
            compliance deadlines, audits, and government permissions through
            one powerful digital platform.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-8">Our Services</h3>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service}
              className="rounded-2xl border p-5 shadow-sm"
            >
              <p className="font-medium">{service}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold">GPCB Rule Simplifier™</h3>
          <p className="mt-4 text-slate-600 max-w-3xl">
            Government circulars explained in simple Gujarati + English.
            No legal confusion. Only practical compliance solutions.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center mb-8">
          Contact Us
        </h3>

        <form className="space-y-4 bg-white border rounded-2xl p-8 shadow-sm">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-xl p-3"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Your Phone Number"
            className="w-full border rounded-xl p-3"
          />

          <textarea
            placeholder="Your Requirement"
            rows="4"
            className="w-full border rounded-xl p-3"
          ></textarea>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl border shadow"
          >
            Submit Enquiry
          </button>
        </form>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h3 className="text-4xl font-bold">
          Need GPCB Approval Fast?
        </h3>
        <p className="mt-4 text-slate-600">
          Get expert support today and book your free site visit.
        </p>
        <button className="mt-8 px-8 py-3 rounded-2xl border shadow">
          Book Free Site Visit
        </button>
      </section>

      <a
        href="https://wa.me/918780723063"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg"
      >
        WhatsApp Us
      </a>
    </div>
  );
}
