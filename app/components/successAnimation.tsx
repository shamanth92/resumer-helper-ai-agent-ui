import { motion } from "framer-motion";

export const SuccessAnimation = () => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center"
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.4,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}