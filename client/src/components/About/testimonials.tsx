import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "John Maina",
      role: "Software Engineer",
      feedback: "BugTracker helped our team identify and fix issues faster than ever.",
    },
    {
      name: "Gabriel Nganga",
      role: "QA Tester",
      feedback: "The real-time notifications and reports are a game-changer for our workflow.",
    },
    {
      name: "Stephen Kinuthia",
      role: "Project Manager",
      feedback: "Managing our team's bugs has never been easier. The platform is intuitive and reliable.",
    },
    {
      name: "Kelly Kamau",
      role: "Frontend Developer",
      feedback: "The intuitive interface and seamless collaboration improved our efficiency significantly.",
    },
    {
      name: "Defla Chebet",
      role: "Backend Developer",
      feedback: "BugTracker allowed us to catch critical issues early and streamline our development process.",
    },
  ];

  return (
    <section className="bg-[#F5F5F5] py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-[#054003]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What Our Users Say
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-8">
          {testimonials.map((t, idx) => {
            const initials = t.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();

            return (
              <motion.div
                key={t.name}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
              >
                {/* Circle with initials */}
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#148C0F] text-white text-xl font-bold mb-4">
                  {initials}
                </div>

                <p className="text-gray-700 italic mb-4 text-center">"{t.feedback}"</p>
                <h3 className="text-lg font-semibold text-[#148C0F]">{t.name}</h3>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
