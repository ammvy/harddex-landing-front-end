import { ScrollToBounce } from "@/components/scroll-to-bounce";
import Container from "@/components/ui/container";
import Logo from "@/components/logo";
import { GamerPersona } from "@/components/pet/personas/gamer";
import { StudyPersona } from "@/components/pet/personas/study";
import { ProPersona } from "@/components/pet/personas/pro";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <Container className="relative">
        <Logo />
        <ScrollToBounce
          direction="bottom"
          containerClassName="absolute bottom-4 left-1/2 -translate-x-1/2"
        />
      </Container>
      <main className="flex flex-col items-center justify-center gap-6">
        <StudyPersona />
        <GamerPersona />
        <ProPersona />
      </main>
    </div>
  );
}
