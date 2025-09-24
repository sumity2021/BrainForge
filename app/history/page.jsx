"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import HistoryPanel from "@/components/HistoryPanel";
import Navbar from "@/components/Navbar";

export default function HistoryPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <HistoryPanel />
          </main>
        </div>
      </SignedIn>
    </>
  );
}
