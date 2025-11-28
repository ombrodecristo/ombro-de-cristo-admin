import { LegalContent } from "./LegalContent";

export default function TermsAndPolicyPage() {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex h-14 items-center justify-between gap-4 border-b bg-primary px-4 text-primary-foreground md:h-16 md:px-6">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo Ombro de Cristo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-md font-bold md:text-lg">
            Termos de Uso e Política de Privacidade
          </h1>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <LegalContent />
      </main>
    </div>
  );
}
