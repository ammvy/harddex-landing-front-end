import { ScrollToBounce } from "@/components/scroll-to-bounce";
import Container from "@/components/ui/container";
import Logo from "@/components/logo";
import { GamerPersona } from "@/components/mouse/personas/gamer";
import { StudyPersona } from "@/components/mouse/personas/study";
import { ProPersona } from "@/components/mouse/personas/pro";

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
      <Container className="flex-row gap-20">
        <StudyPersona className="w-full max-w-[200px]" />
        <GamerPersona className="w-full max-w-[200px]" />
        <ProPersona className="w-full max-w-[200px]" />
      </Container>
    </div>
  );
}
