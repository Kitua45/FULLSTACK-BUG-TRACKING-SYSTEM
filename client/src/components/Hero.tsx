import { motion } from "framer-motion";
import heroBg from "../assets/hero4.jpg";
import rightHero from "../assets/righthero.jpg";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col md:flex-row items-center justify-between 
                 px-6 md:px-16 py-28 md:py-32 bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* LEFT TEXT */}
      <div className="relative z-10 max-w-xl text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
        >
          Track Bugs Efficiently.
          <br />
          <span className="text-[#2ABF24]">Deliver Better Software.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-200 mt-5 text-lg md:text-xl leading-relaxed"
        >
          A powerful collaboration tool for developers, testers, and managers
          to identify, organize, and resolve issues with ease.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="text-gray-300 mt-4 text-md md:text-lg"
        >
          Stay ahead with real-time bug monitoring, smart reporting,
          and seamless team communication.
        </motion.p>
      </div>

      {/* RIGHT IMAGE */}
      <motion.div
        className="relative z-10 flex justify-center items-center mt-12 md:mt-0"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={rightHero}
          alt="Bug Tracking Illustration"
          className="
            w-[360px] sm:w-[450px] md:w-[550px] lg:w-[650px] 
            rounded-2xl shadow-2xl
            border border-[#2ABF24]/40
            shadow-[#2ABF24]/40
          "
        />
      </motion.div>
    </section>
  );
}
