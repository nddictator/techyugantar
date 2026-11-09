// src/components/Common/SocialSidebar.tsx
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaPinterestP } from "react-icons/fa";

const socials = [
  { name: "Facebook", icon: <FaFacebookF />, href: "https://facebook.com/yourpage" },
  { name: "Twitter", icon: <FaTwitter />, href: "https://twitter.com/yourhandle" },
  { name: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com/in/yourprofile" },
  { name: "YouTube", icon: <FaYoutube />, href: "https://youtube.com/yourchannel" },
  { name: "Pinterest", icon: <FaPinterestP />, href: "https://pinterest.com/yourprofile" },
];

export default function SocialSidebar() {
  return (
    <div className="fixed left-0 top-1/3 flex flex-col space-y-2 z-50">
      {socials.map(({ name, icon, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-r-full pl-2 pr-3 py-2 shadow-md transform -translate-x-full hover:translate-x-0 transition-transform duration-300 ease-out"
        >
          <span className="text-xl mr-2">{icon}</span>
          <span className="whitespace-nowrap font-medium">{name}</span>
        </a>
      ))}
    </div>
  );
}
