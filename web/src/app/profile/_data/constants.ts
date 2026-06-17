import { ProfileId } from "@/components/mouse";

export interface MockUser {
  id: number;
  name: string;
  email: string;
  style:
    | "BASIC"
    | "INTERMEDIATE"
    | "ADVANCED"
    | "GAMER"
    | "PROFESSIONAL"
    | "Remote work"
    | "File / Media"
    | "Mobility"
    | "Light travel";
  permission: "ADMIN" | "USER" | "CURATOR";
}

export const STYLE_TO_PROFILE_ID: Record<MockUser["style"], ProfileId> = {
  BASIC: "study",
  INTERMEDIATE: "dev",
  ADVANCED: "creative",
  GAMER: "gamer",
  PROFESSIONAL: "pro",
  "Remote work": "pro",
  "File / Media": "creative",
  Mobility: "mobile",
  "Light travel": "mobile",
};

export const STYLE_DETAILS: Record<
  MockUser["style"],
  { label: string; description: string; colorClass: string }
> = {
  BASIC: {
    label: "Básico / Estudante",
    description: "Uso focado em tarefas diárias, estudos e navegação geral.",
    colorClass: "from-blue-500/5 to-cyan-500/5 dark:from-blue-500/20 dark:to-cyan-500/20 border-blue-500/20 dark:border-blue-500/30 text-blue-600 dark:text-blue-400",
  },
  INTERMEDIATE: {
    label: "Intermediário",
    description: "Uso equilibrado para trabalho multitarefa e jogos casuais.",
    colorClass: "from-teal-500/5 to-emerald-500/5 dark:from-teal-500/20 dark:to-emerald-500/20 border-teal-500/20 dark:border-teal-500/30 text-teal-600 dark:text-teal-400",
  },
  ADVANCED: {
    label: "Avançado",
    description: "Alto desempenho para criação de conteúdo ou tarefas pesadas.",
    colorClass: "from-purple-500/5 to-pink-500/5 dark:from-purple-500/20 dark:to-pink-500/20 border-purple-500/20 dark:border-purple-500/30 text-purple-600 dark:text-purple-400",
  },
  GAMER: {
    label: "Gamer",
    description: "Foco total em taxa de atualização alta, latência mínima e máximo FPS.",
    colorClass: "from-red-500/5 to-orange-500/5 dark:from-red-500/20 dark:to-orange-500/20 border-red-500/20 dark:border-red-500/30 text-red-600 dark:text-red-400",
  },
  PROFESSIONAL: {
    label: "Profissional",
    description: "Estação de trabalho potente para engenharia, modelagem ou edição de vídeo.",
    colorClass: "from-indigo-500/5 to-violet-500/5 dark:from-indigo-500/20 dark:to-violet-500/20 border-indigo-500/20 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400",
  },
  "Remote work": {
    label: "Trabalho Remoto",
    description: "Foco em ergonomia, confiabilidade e produtividade em home office.",
    colorClass: "from-sky-500/5 to-blue-500/5 dark:from-sky-500/20 dark:to-blue-500/20 border-sky-500/20 dark:border-sky-500/30 text-sky-600 dark:text-sky-400",
  },
  "File / Media": {
    label: "Mídia & Armazenamento",
    description: "Grande capacidade de armazenamento e consumo de mídia de alta fidelidade.",
    colorClass: "from-amber-500/5 to-yellow-500/5 dark:from-amber-500/20 dark:to-yellow-500/20 border-amber-500/20 dark:border-amber-500/30 text-amber-600 dark:text-amber-400",
  },
  Mobility: {
    label: "Mobilidade",
    description: "Leveza, portabilidade extrema e longa duração de bateria.",
    colorClass: "from-rose-500/5 to-pink-500/5 dark:from-rose-500/20 dark:to-rose-500/20 border-rose-500/20 dark:border-rose-500/30 text-rose-600 dark:text-rose-400",
  },
  "Light travel": {
    label: "Viagem Leve",
    description: "Configuração ultraportátil para quem está sempre em trânsito.",
    colorClass: "from-fuchsia-500/5 to-pink-500/5 dark:from-fuchsia-500/20 dark:to-fuchsia-500/20 border-fuchsia-500/20 dark:border-fuchsia-500/30 text-fuchsia-600 dark:text-fuchsia-400",
  },
};

export const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    name: "Alex Silva",
    email: "alex.gamer@harddex.com.br",
    style: "GAMER",
    permission: "USER",
  },
  {
    id: 2,
    name: "Beatriz Nogueira",
    email: "beatriz.pro@harddex.com.br",
    style: "Remote work",
    permission: "CURATOR",
  },
  {
    id: 3,
    name: "Carlos Eduardo (Admin)",
    email: "carlos.admin@harddex.com.br",
    style: "INTERMEDIATE",
    permission: "ADMIN",
  },
  {
    id: 4,
    name: "Diana Mello",
    email: "diana.dev@harddex.com.br",
    style: "PROFESSIONAL",
    permission: "USER",
  },
  {
    id: 5,
    name: "Elisa Abreu",
    email: "elisa.travel@harddex.com.br",
    style: "Mobility",
    permission: "USER",
  },
];
