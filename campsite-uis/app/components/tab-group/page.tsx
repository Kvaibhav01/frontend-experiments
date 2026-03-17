"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const tabVariants = {
  active: {
    backgroundColor: "rgba(242, 235, 233, 1)", // #F2EBE9
    boxShadow:
      "0px 1px 1px 1px rgba(172,141,134,0.3), inset 0px 1px 1px 1px rgba(243,243,242,1)",
  },
  hovered: {
    backgroundColor: "rgba(234, 226, 224, 1)", // #EAE2E0
    boxShadow: "none",
  },
  normal: {
    backgroundColor: "rgba(234, 226, 224, 0)", // Transparent
    boxShadow: "none",
  },
};

const Tab = ({
  label,
  isActive,
  isHovered,
  onClick,
  onHoverStart,
  onHoverEnd,
}: {
  label: string;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) => {
  return (
    <motion.button
      className={`rounded px-[18px] py-2 font-medium ${
        isActive
          ? "text-[#2B2322]"
          : isHovered
            ? "text-[#2B2322]"
            : "text-[#2B2322]/80"
      }`}
      variants={tabVariants}
      initial={isActive ? "active" : "normal"}
      animate={isActive ? "active" : isHovered ? "hovered" : "normal"}
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.button>
  );
};

const TabGroup = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const tabs = ["Overview", "Gear", "Notes"];

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-[#F2EBE9] p-24">
      {/* Tab Bar */}
      <div className="flex items-center justify-center gap-4 rounded-lg bg-[#EAE2E0] px-[10px] py-2 shadow-[inset_0px_0px_1px_1px_rgba(172,141,134,0.3)]">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            label={tab}
            isActive={activeTab === tab}
            isHovered={hoveredTab === tab}
            onClick={() => setActiveTab(tab)}
            onHoverStart={() => setHoveredTab(tab)}
            onHoverEnd={() => setHoveredTab(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default TabGroup;
