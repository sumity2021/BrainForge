"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import ChallengeGenerator from "@/components/ChallengeGenerator";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <ChallengeGenerator />
          </main>
        </div>
      </SignedIn>
    </>
  );
}
