import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "../SidebarNav";
import { useRef, useEffect } from "react";

type SidebarProps = {
  isDesktopClosed: boolean;
  onToggleDesktop: () => void;
};

export default function Sidebar({
  isDesktopClosed,
  onToggleDesktop,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !isDesktopClosed &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onToggleDesktop();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDesktopClosed, onToggleDesktop]);

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "hidden md:flex md:flex-col md:border-r md:bg-primary md:text-primary-foreground md:transition-all",
        isDesktopClosed ? "w-16" : "w-64"
      )}
    >
      <div
        className="flex h-14 items-center justify-between p-4 md:h-16 cursor-pointer"
        onClick={onToggleDesktop}
      >
        <div
          className={cn(
            "flex items-center gap-2",
            isDesktopClosed && "justify-center"
          )}
          role="button"
          tabIndex={0}
          aria-label="Alternar navegação"
        >
          <Menu className="h-6 w-6" />
          <span
            className={cn("text-md font-semibold", isDesktopClosed && "hidden")}
          >
            Administração
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleDesktop}
          className={cn(
            "text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground",
            isDesktopClosed && "mr-1"
          )}
        >
          {isDesktopClosed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <SidebarNav
          isDesktopClosed={isDesktopClosed}
          onLinkClick={!isDesktopClosed ? onToggleDesktop : undefined}
        />
      </div>
    </aside>
  );
}
