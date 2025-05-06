
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
export const Logo = () => {
  const { theme } = useTheme();

  return (
    <Link to="/" className="flex-shrink-0">
      <img
        src="/lovable-uploads/c2c0e920-a554-4d65-8e05-10b2d47db13e.png"
        alt="National Trade Fair"
        className={`h-10 md:h-12 min-w-[40px] ${theme === "dark" ? "invert" : ""}`}
      />
    </Link>
  );
};
