const initials = (author: string) =>
  author
    .split("—")[0]
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const AuthorAvatar = ({ author, size = 40 }: { author: string; size?: number }) => {
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      className="bg-primary/90 flex shrink-0 items-center justify-center rounded-full font-bold text-white"
    >
      {initials(author)}
    </span>
  );
};

export default AuthorAvatar;
