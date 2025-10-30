import { Menu, ShieldHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenu from "../UserMenu";

type HeaderProps = {
  onToggleMobile: () => void;
};

export default function Header({ onToggleMobile }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-primary px-4 text-primary-foreground md:h-16 md:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground md:hidden"
          onClick={onToggleMobile}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>

        <div className="flex items-center gap-2">
          <ShieldHalf className="h-5 w-5" />
          <h1 className="text-md font-bold md:text-lg">Ombro de Cristo</h1>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <UserMenu />
      </div>
    </header>
  );
}
