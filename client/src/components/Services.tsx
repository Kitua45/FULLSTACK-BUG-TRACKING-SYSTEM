import { motion } from "framer-motion";
import Navbar from "../components/Nav/navbar";
import { Bug, BarChart2, Users, Globe, CheckCircle } from "lucide-react";

const services = [
  {
    title: "Bug Tracking",
    description:
      "Track software bugs in real-time, assign them to team members, and monitor their progress seamlessly.",
    icon: <Bug className="w-8 h-8 text-white" />,
    color: "bg-[#148C0F]",
  },
  {
    title: "Analytics & Reporting",
    description:
      "Generate smart reports and analytics to identify trends, prioritize tasks, and make informed decisions.",
    icon: <BarChart2 className="w-8 h-8 text-white" />,
    color: "bg-[#2ABF24]",
  },
  {
    title: "Team Collaboration",
    description:
      "Communicate with team members directly within the platform, reducing emails and enhancing efficiency.",
    icon: <Users className="w-8 h-8 text-white" />,
    color: "bg-[#148C0F]",
  },
  {
    title: "Global Access",
    description:
      "Access your projects and bug reports from anywhere, ensuring your team stays productive on-the-go.",
    icon: <Globe className="w-8 h-8 text-white" />,
    color: "bg-[#2ABF24]",
  },
  {
    title: "Quality Assurance",
    description:
      "Ensure higher quality releases by integrating testing, QA feedback, and bug management seamlessly.",
    icon: <CheckCircle className="w-8 h-8 text-white" />,
    color: "bg-[#148C0F]",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#F0F8F2] text-[#054003]">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-28 pb-20 px-6 md:px-12 text-center relative">
        <div className="absolute inset-0 bg-[#054003]/5 -z-10"></div>
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h1>
        <motion.p
          className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          BugTracker offers a variety of tools and features to help teams deliver
          high-quality software faster and more efficiently.
        </motion.p>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-6xl mx-auto py-20 px-6 md:px-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, idx) => (
          <motion.div
            key={service.title}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${service.color}`}
            >
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#148C0F]">
              {service.title}
            </h3>
            <p className="text-gray-700">{service.description}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
