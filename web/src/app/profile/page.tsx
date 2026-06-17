"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { MOCK_USERS, MockUser } from "./_data/constants";
import ProfileCard from "./_components/ProfileCard";

// ============================================================================
// DICA DE DESENVOLVIMENTO / TESTE:
// Para simular outros usuários pré-definidos via código, altere o índice abaixo:
// MOCK_USERS[0] = Alex (Gamer - USER)
// MOCK_USERS[1] = Beatriz (Remote work - CURATOR)
// MOCK_USERS[2] = Carlos (Intermediate - ADMIN)
// MOCK_USERS[3] = Diana (Professional - USER)
// MOCK_USERS[4] = Elisa (Mobility - USER)
// ============================================================================
const INITIAL_MOCK_USER = MOCK_USERS[0];

export default function ProfilePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<MockUser>(INITIAL_MOCK_USER);

  const handleUpdateUser = (updatedUser: MockUser) => {
    setCurrentUser(updatedUser);
  };

  const handleLogout = () => {
    // Apenas redireciona para a home para simular o logout
    router.push("/");
  };

  return (
    <div
      className="min-h-screen w-full bg-background text-foreground flex flex-col transition-colors duration-200"
      style={{ fontFamily: "'Inter Tight', sans-serif" }}
    >
      {/* Global Header */}
      <Header label="Meu Perfil" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-[1400px] mx-auto w-full px-4 py-12 md:py-16">
        
        {/* Profile Card Container */}
        <div className="w-full flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentUser.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ProfileCard 
                user={currentUser} 
                onUpdateUser={handleUpdateUser}
                onLogout={handleLogout}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
