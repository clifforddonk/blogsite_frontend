import { motion } from "framer-motion";

export default function FadeInSection({
  children,
  delay = 0,
  className = "",
  id = "",
}) {
  return (
    <motion.section
      className={className} // Allow passing a className prop
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.section>
  );
}
