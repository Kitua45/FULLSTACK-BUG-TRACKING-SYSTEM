import { motion } from "framer-motion";

export default function Intro() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#054003]">
      {/* HERO SECTION */}
      <section className="py-20 px-6 md:px-12 text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About BugTracker
        </motion.h1>
        <motion.p
          className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          BugTracker is a powerful platform designed to help developers, testers,
          and managers identify, organize, and resolve software issues efficiently.
          Our goal is to make bug tracking seamless, collaborative, and insightful.
        </motion.p>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-6xl mx-auto py-20 px-6 md:px-12 grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#148C0F]">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To empower teams to deliver better software by providing a collaborative
            platform to track, manage, and resolve bugs efficiently. We aim to
            simplify workflows and improve communication across all team members.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#148C0F]">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To be the leading bug tracking solution, combining simplicity, real-time insights,
            and seamless collaboration. We envision a world where software development is smooth,
            predictable, and productive for all teams.
          </p>
        </motion.div>
      </section>

      {/* FEATURES / VALUES */}
      <section className="py-20 px-6 md:px-12 bg-[#E6F4EA]">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Why Choose BugTracker?
          </motion.h2>

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
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-[#148C0F]">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
