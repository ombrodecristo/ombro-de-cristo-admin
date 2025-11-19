import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarNav } from "../SidebarNav";
import { useRef } from "react";

type SidebarProps = {
  isDesktopClosed: boolean;
  onToggleDesktop: () => void;
};

export default function Sidebar({
  isDesktopClosed,
  onToggleDesktop,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);

  const handleMouseEnter = () => {
    if (isDesktopClosed) {
      onToggleDesktop();
    }
  };

  const handleMouseLeave = () => {
    if (!isDesktopClosed) {
      onToggleDesktop();
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "hidden md:flex md:flex-col md:border-r md:bg-primary md:text-primary-foreground md:transition-all",
        isDesktopClosed ? "w-16" : "w-64"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex h-14 items-center p-4 md:h-16">
        <div
          className={cn(
            "flex items-center gap-2 w-full",
            isDesktopClosed && "justify-center"
          )}
        >
          <Menu className="h-6 w-6" />
          <span
            className={cn("text-md font-semibold", isDesktopClosed && "hidden")}
          >
            Navegação
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <SidebarNav isDesktopClosed={isDesktopClosed} />
      </div>
    </aside>
  );
}
