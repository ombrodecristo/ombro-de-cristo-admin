import { NavLink } from "react-router-dom";
import { Users, Church, BookText } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type SidebarNavProps = {
  isDesktopClosed: boolean;
  onLinkClick?: () => void;
};

export function SidebarNav({ isDesktopClosed, onLinkClick }: SidebarNavProps) {
  return (
    <nav className="flex flex-col gap-2 px-2 text-primary-foreground">
      <NavLink
        to="/admin/users"
        className={({ isActive }) =>
          cn(
            buttonVariants({
              variant: "ghost",
            }),
            "w-full justify-start gap-2",
            isActive
              ? "bg-black/20 text-primary-foreground"
              : "hover:bg-black/10 hover:text-primary-foreground",
            isDesktopClosed && "justify-center"
          )
        }
        onClick={onLinkClick}
      >
        <Users className="h-4 w-4" />
        <span className={cn(isDesktopClosed && "hidden")}>Usuários</span>
      </NavLink>
      <NavLink
        to="/admin/churches"
        className={({ isActive }) =>
          cn(
            buttonVariants({
              variant: "ghost",
            }),
            "w-full justify-start gap-2",
            isActive
              ? "bg-black/20 text-primary-foreground"
              : "hover:bg-black/10 hover:text-primary-foreground",
            isDesktopClosed && "justify-center"
          )
        }
        onClick={onLinkClick}
      >
        <Church className="h-4 w-4" />
        <span className={cn(isDesktopClosed && "hidden")}>Igrejas</span>
      </NavLink>
      <NavLink
        to="/admin/devotionals"
        className={({ isActive }) =>
          cn(
            buttonVariants({
              variant: "ghost",
            }),
            "w-full justify-start gap-2",
            isActive
              ? "bg-black/20 text-primary-foreground"
              : "hover:bg-black/10 hover:text-primary-foreground",
            isDesktopClosed && "justify-center"
          )
        }
        onClick={onLinkClick}
      >
        <BookText className="h-4 w-4" />
        <span className={cn(isDesktopClosed && "hidden")}>Devocionais</span>
      </NavLink>
    </nav>
  );
}
