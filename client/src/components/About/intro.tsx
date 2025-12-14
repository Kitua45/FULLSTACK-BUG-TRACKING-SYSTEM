export default function Intro() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#054003]">
      {/* HERO SECTION */}
      <section className="py-20 px-6 md:px-12 text-center" data-test="about-hero-section">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          data-test="About-heading"
        >
          About BugTracker
        </h1>

        <p data-test="about-description" className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
          BugTracker is a powerful platform designed to help developers, testers,
          and managers identify, organize, and resolve software issues efficiently.
          Our goal is to make bug tracking seamless, collaborative, and insightful.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-6xl mx-auto py-20 px-6 md:px-12 grid md:grid-cols-2 gap-12" data-test="mission-vision-section">
        <div className="bg-white p-8 rounded-xl shadow-md" data-test="mission-card">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#148C0F]" data-test="mission-heading">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed" data-test="mission-description">
            To empower teams to deliver better software by providing a collaborative
            platform to track, manage, and resolve bugs efficiently. We aim to
            simplify workflows and improve communication across all team members.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md" data-test="vision-card">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#148C0F]" data-test="vision-heading">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed" data-test="vision-description">
            To be the leading bug tracking solution, combining simplicity, real-time insights,
            and seamless collaboration. We envision a world where software development is smooth,
            predictable, and productive for all teams.
          </p>
        </div>
      </section>

      {/* FEATURES / VALUES */}
      <section className="py-20 px-6 md:px-12 bg-[#E6F4EA]" data-test="features-section">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" data-test="features-heading">
            Why Choose BugTracker?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Real-Time Monitoring",
                desc: "Track bugs and issues instantly with live updates and notifications.",
              },
              {
                title: "Smart Reporting",
                desc: "Generate detailed reports and analytics to make informed decisions.",
              },
              {
                title: "Seamless Collaboration",
                desc: "Keep your team aligned with built-in communication tools.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
                data-test={`feature-${feature.title.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <h3 className="text-xl font-semibold mb-4 text-[#148C0F]" data-test={`feature-${feature.title.replace(/\s+/g, '-').toLowerCase()}-title`}>
                  {feature.title}
                </h3>
                <p data-test={`feature-${feature.title.replace(/\s+/g, '-').toLowerCase()}-desc`} className="text-gray-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
