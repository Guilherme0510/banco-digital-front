import { Sidebar } from "@/components/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10 pt-20 lg:pt-10 max-w-7xl mx-auto w-full">{children}</main>
    </div>
  );
}
