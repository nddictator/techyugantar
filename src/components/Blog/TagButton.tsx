const TagButton = ({ href = "#0", text }: { href?: string; text: string }) => {
  return (
    <a
      href={href}
      className="mb-3 mr-3 inline-flex items-center justify-center rounded-full border border-black/[0.08] bg-white/70 px-4 py-2 text-sm text-gray-600 transition-all duration-300 hover:border-primary/40 hover:text-primary dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:text-white"
    >
      {text}
    </a>
  );
};

export default TagButton;
