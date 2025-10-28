import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { User, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function UserMenu() {
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        className={cn(
          'h-8 w-8 rounded-full p-0',
          'bg-black/10 text-primary-foreground',
          'hover:bg-black/20',
        )}
        onClick={() => setIsOpen(true)}
        aria-label="Menu do usuário"
      >
        <User className="h-6 w-6" />
      </Button>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-center">Minha Conta</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={() => {
              signOut()
              setIsOpen(false)
            }}
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}