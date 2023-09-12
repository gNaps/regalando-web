"use client";

import Footer from "@/components/footer.component";
import { UserContextProvider } from "@/contexts/user.context";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserContextProvider>
        <main className="w-96 m-auto px-3 pb-3 flex flex-col max-h-screen">
          <section className="pt-8 flex-1 max-h-screen overflow-auto hide-scroll flex flex-col">{children}</section>
          <Footer />
        </main>
        
      </UserContextProvider>
    </>
  );
}
