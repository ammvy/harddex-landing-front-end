import { NextRequest, NextResponse } from "next/server";
import { Device, ProfileId } from "../../compare/_data/types";
import { PROFILE_LABELS } from "../../compare/_data/profiles";

// Helper to clean up Markdown / JSON syntax if any
function getSpecsSummary(device: Device, category: string): string {
  const specs = device.specs as any;
  if (category === "phone") {
    return `
- CPU: ${specs.cpu} (${specs.cpuCores} núcleos, ${specs.cpuClock} GHz, ${specs.process})
- GPU: ${specs.gpu} (${specs.gpuTflops} TFLOPS)
- RAM: ${specs.ram} GB ${specs.ramType} (${specs.ramSpeed} MHz)
- Armazenamento: ${specs.storage} GB ${specs.storageType} (Leitura: ${specs.read} MB/s, Escrita: ${specs.write} MB/s)
- Tela: ${specs.display.size}", ${specs.display.res}, ${specs.display.refresh}Hz, ${specs.display.panel}, ${specs.display.nits} nits, ${specs.display.gamut}% gamut
- Bateria: ${specs.battery.capacity} mAh, ${specs.battery.life}h de uso, Recarga ${specs.battery.charge}W (Sem fio: ${specs.battery.wireless}W)
- Câmeras: Principal de ${specs.camera.main}MP, Ultra-wide ${specs.camera.ultra}MP, Teleobjetiva ${specs.camera.tele}MP, Gravação ${specs.camera.videoK}K
- Peso/Dimensões: ${specs.weight}g, ${specs.dims}
- Conectividade: ${specs.wifi}, Bluetooth ${specs.bt}
- Preço: R$ ${device.price.toLocaleString("pt-BR")}
- Pontuação Geral: ${device.overall}/100
- Adequação para o Perfil: ${device.tdu.gamer ?? 50}% Gamer, ${device.tdu.pro ?? 50}% Produtividade, ${device.tdu.study ?? 50}% Estudo, ${device.tdu.creative ?? 50}% Criativo, ${device.tdu.dev ?? 50}% Dev, ${device.tdu.mobile ?? 50}% Mobilidade
`;
  } else {
    return `
- CPU: ${specs.cpu} (${specs.cpuCores} núcleos, ${specs.cpuClock} GHz, ${specs.process}, TDP: ${specs.tdp}W)
- GPU: ${specs.gpu} (${specs.vram}GB VRAM, ${specs.gpuTflops} TFLOPS)
- RAM: ${specs.ram} GB ${specs.ramType} (${specs.ramSpeed} MHz)
- Armazenamento: ${specs.storage} GB ${specs.storageType} (Leitura: ${specs.read} MB/s, Escrita: ${specs.write} MB/s)
- Tela: ${specs.display.size}", ${specs.display.res}, ${specs.display.refresh}Hz, ${specs.display.panel}, ${specs.display.nits} nits, ${specs.display.gamut}% gamut, Resposta: ${specs.display.response}ms
- Bateria: ${specs.battery.capacity} Wh, ${specs.battery.life}h de uso, Recarga ${specs.battery.charge}W
- Webcam: ${specs.webcam.mp}MP, Infravermelho: ${specs.webcam.ir ? "Sim" : "Não"}
- Peso/Dimensões: ${specs.weight}kg, ${specs.dims}
- Portas: ${specs.ports.join(", ")}
- Conectividade: ${specs.wifi}, Bluetooth ${specs.bt}
- Preço: R$ ${device.price.toLocaleString("pt-BR")}
- Pontuação Geral: ${device.overall}/100
- Adequação para o Perfil: ${device.tdu.gamer ?? 50}% Gamer, ${device.tdu.pro ?? 50}% Produtividade, ${device.tdu.study ?? 50}% Estudo, ${device.tdu.creative ?? 50}% Criativo, ${device.tdu.dev ?? 50}% Dev, ${device.tdu.mobile ?? 50}% Mobilidade
`;
  }
}

function generateSmartFallbackText(
  deviceA: Device,
  deviceB: Device,
  tdu: ProfileId
): string {
  const labelTdu = PROFILE_LABELS[tdu] || tdu;
  const ratingA = deviceA.tdu[tdu] || deviceA.overall;
  const ratingB = deviceB.tdu[tdu] || deviceB.overall;

  const category = deviceA.category;
  const specsA = deviceA.specs as any;
  const specsB = deviceB.specs as any;

  let winner = deviceA;
  let loser = deviceB;
  let isTie = false;

  if (ratingA === ratingB) {
    if (deviceA.overall > deviceB.overall) {
      winner = deviceA;
      loser = deviceB;
    } else if (deviceB.overall > deviceA.overall) {
      winner = deviceB;
      loser = deviceA;
    } else {
      isTie = true;
    }
  } else if (ratingB > ratingA) {
    winner = deviceB;
    loser = deviceA;
  }

  // Persona comments based on TDU
  let analysisIntro = "";
  let comparisonDetails = "";
  let verdict = "";

  switch (tdu) {
    case "gamer":
      analysisIntro = `E aí, jogador! 🎮 Mouse na área. Analisei as specs de peso aqui. Se o foco é rodar jogos pesados e ter a melhor fluidez possível, o foco principal está na GPU, taxa de atualização da tela e gerenciamento térmico (no caso de notebooks).`;
      if (category === "phone") {
        comparisonDetails = `O **${deviceA.brand} ${deviceA.model}** traz a GPU *${specsA.gpu}* com **${specsA.gpuTflops} TFLOPS** e tela de **${specsA.display.refresh}Hz**. Já o **${deviceB.brand} ${deviceB.model}** vem com a *${specsB.gpu}* (**${specsB.gpuTflops} TFLOPS**) e tela de **${specsB.display.refresh}Hz**. O maior poder gráfico e a tela mais rápida dão uma vantagem nítida para a jogabilidade competitiva.`;
      } else {
        comparisonDetails = `Olhando a GPU de notebook: o **${deviceA.brand} ${deviceA.model}** possui a *${specsA.gpu}* com **${specsA.vram}GB de VRAM** e **${specsA.gpuTflops} TFLOPS**. Do outro lado, o **${deviceB.brand} ${deviceB.model}** conta com a *${specsB.gpu}* (**${specsB.vram}GB VRAM** e **${specsB.gpuTflops} TFLOPS**). Essa diferença em TFLOPS é o divisor de águas para rodar jogos AAA em taxas de quadros estáveis.`;
      }
      verdict = isTie
        ? `Os dois entregam o mesmo nível de performance em jogos! Mas recomendo ir no que estiver mais em conta no dia. ⚡`
        : `Sem dúvidas, se você quer a maior taxa de quadros e o melhor desempenho para jogos, a escolha ideal é o **${winner.brand} ${winner.model}**! Ele vai rodar tudo com o pé nas costas. 😎`;
      break;

    case "pro":
      analysisIntro = `Olá! 💼 Mouse aqui. Se você busca produtividade no dia a dia, precisamos focar em multitarefa eficiente (CPU e RAM), bateria estável e uma tela confortável para ler e trabalhar por horas.`;
      if (category === "phone") {
        comparisonDetails = `O **${deviceA.brand} ${deviceA.model}** vem com o processador *${specsA.cpu}* e **${specsA.ram} GB** de RAM, contra o *${specsB.cpu}* e **${specsB.ram} GB** de RAM do **${deviceB.brand} ${deviceB.model}**. Na bateria, temos **${specsA.battery.capacity} mAh** com até **${specsA.battery.life}h** de autonomia no ${deviceA.model}, contra **${specsB.battery.capacity} mAh** e **${specsB.battery.life}h** no ${deviceB.model}.`;
      } else {
        comparisonDetails = `Para o seu fluxo de trabalho: o **${deviceA.brand} ${deviceA.model}** oferece um CPU *${specsA.cpu}* de **${specsA.cpuCores} núcleos** e **${specsA.ram} GB** de RAM. O **${deviceB.brand} ${deviceB.model}** responde com o *${specsB.cpu}* (**${specsB.cpuCores} núcleos**) e **${specsB.ram} GB** de RAM. A duração de bateria do ${deviceA.model} é de **${specsA.battery.life}h**, enquanto o ${deviceB.model} sustenta **${specsB.battery.life}h**.`;
      }
      verdict = isTie
        ? `Temos um empate técnico para produtividade! Qualquer um dos dois dará conta de planilhas complexas e centenas de abas. Vá de acordo com seu gosto estético!`
        : `Pensando em manter a produtividade lá em cima sem lentidões e com maior autonomia de bateria, o **${winner.brand} ${winner.model}** é a ferramenta ideal para você! 🚀`;
      break;

    case "study":
      analysisIntro = `Fala, estudante! 📚 Mouse pronto para economizar seu tempo (e dinheiro!). Aqui o foco é custo-benefício, peso reduzido para carregar na mochila, bateria confiável para aguentar as aulas e uma webcam/câmera decente.`;
      comparisonDetails = `Comparando o investimento: o **${deviceA.brand} ${deviceA.model}** custa **R$ ${deviceA.price.toLocaleString("pt-BR")}** e pesa **${specsA.weight}${category === "phone" ? "g" : "kg"}**, entregando **${specsA.battery.life}h** de bateria. Já o **${deviceB.brand} ${deviceB.model}** custa **R$ ${deviceB.price.toLocaleString("pt-BR")}**, pesando **${specsB.weight}${category === "phone" ? "g" : "kg"}** e durando **${specsB.battery.life}h**.`;
      verdict = isTie
        ? `Os dois aparelhos são incríveis e bem equilibrados para estudos. O desempate fica inteiramente por conta de qual cor te agrada mais!`
        : `Pelo equilíbrio entre preço, portabilidade e bateria que não vai te deixar na mão no meio da aula, eu recomendo fortemente o **${winner.brand} ${winner.model}**. É a compra mais inteligente para seu ano letivo! 🎓`;
      break;

    case "creative":
      analysisIntro = `Saudações artísticas! 🎨 Mouse focado em cores e renderização. Para criadores de conteúdo, designers e fotógrafos, a fidelidade de cores da tela (Gamut e Nitidez), poder de processamento gráfico para renderizar e velocidade do armazenamento são tudo.`;
      comparisonDetails = `No quesito tela, o **${deviceA.brand} ${deviceA.model}** vem com painel **${specsA.display.panel}** de **${specsA.display.nits} nits** de brilho e **${specsA.display.gamut}%** do espectro de cores, além de armazenamento com leitura de **${specsA.read} MB/s**. O **${deviceB.brand} ${deviceB.model}** traz um painel **${specsB.display.panel}** de **${specsB.display.nits} nits**, **${specsB.display.gamut}%** gamut e leitura de **${specsB.read} MB/s**.`;
      verdict = isTie
        ? `Ambas as telas são de nível cinematográfico! O fluxo de trabalho criativo rodará perfeitamente em qualquer um deles.`
        : `Para ver suas criações com a fidelidade de cores máxima e renderizar seus projetos com velocidade imbatível, vá sem medo no **${winner.brand} ${winner.model}**. É o queridinho dos criativos! 🖼️`;
      break;

    case "dev":
      analysisIntro = `Compilando dados... 💻 Mouse focado em desenvolvimento de software! Desenvolvedores precisam de muito poder de processamento multi-core, memória RAM rápida para subir containers e compilação ágil, além de um bom teclado/tela.`;
      if (category === "phone") {
        comparisonDetails = `No mundo mobile, o **${deviceA.brand} ${deviceA.model}** tem o processador *${specsA.cpu}* de **${specsA.cpuCores} cores** com clock de **${specsA.cpuClock} GHz**, enquanto o **${deviceB.brand} ${deviceB.model}** tem o *${specsB.cpu}* de **${specsB.cpuCores} cores** a **${specsB.cpuClock} GHz**. O armazenamento do ${deviceA.model} opera com velocidade de escrita de **${specsA.write} MB/s**, e o ${deviceB.model} com **${specsB.write} MB/s**.`;
      } else {
        comparisonDetails = `Para programar: o **${deviceA.brand} ${deviceA.model}** conta com a CPU *${specsA.cpu}* de **${specsA.cpuCores} núcleos/threads** e velocidade de escrita no SSD de **${specsA.write} MB/s**. O **${deviceB.brand} ${deviceB.model}** tem a CPU *${specsB.cpu}* de **${specsB.cpuCores} núcleos** e escrita de **${specsB.write} MB/s**. A quantidade de portas é outro fator importante: o ${deviceA.model} traz portas como *${specsA.ports.join(", ")}*, contra *${specsB.ports.join(", ")}* do ${deviceB.model}.`;
      }
      verdict = isTie
        ? `Os dois compiladores vão voar baixo! Ambos entregam ótimos tempos de build e estabilidade. Escolha o que couber melhor no bolso.`
        : `Considerando o desempenho bruto de CPU multi-core para acelerar suas compilações e rodar seus ambientes locais de desenvolvimento sem engasgar, o **${winner.brand} ${winner.model}** é a máquina de código que você precisa! ⚡`;
      break;

    case "mobile":
      analysisIntro = `Liberdade sem fios! ✈️ Mouse focado em quem vive em movimento. Para o perfil de alta mobilidade, o dispositivo precisa ser muito leve, fino, ter excelente autonomia de bateria e as tecnologias mais recentes de conexão.`;
      comparisonDetails = `Analisando a portabilidade física: o **${deviceA.brand} ${deviceA.model}** pesa apenas **${specsA.weight}${category === "phone" ? "g" : "kg"}** com espessura compacta, oferecendo bateria de **${specsA.battery.life}h** e suporte a **${specsA.wifi}**. Por sua vez, o **${deviceB.brand} ${deviceB.model}** pesa **${specsB.weight}${category === "phone" ? "g" : "kg"}**, com **${specsB.battery.life}h** de autonomia de bateria e suporte a **${specsB.wifi}**.`;
      verdict = isTie
        ? `Ambos são levíssimos e perfeitos para nômades digitais! A bateria dos dois aguenta facilmente o dia inteiro longe da tomada.`
        : `Para você carregar na mochila sem dores nas costas e ter a certeza de que a bateria vai durar durante todo o seu deslocamento, a escolha certa é o **${winner.brand} ${winner.model}**! 🔋`;
      break;
  }

  return `${analysisIntro}\n\n${comparisonDetails}\n\n${verdict}`;
}

export async function POST(req: NextRequest) {
  try {
    const { deviceA, deviceB, tdu } = (await req.json()) as {
      deviceA: Device;
      deviceB: Device;
      tdu: ProfileId;
    };

    if (!deviceA || !deviceB || !tdu) {
      return NextResponse.json(
        { error: "Parâmetros deviceA, deviceB e tdu são obrigatórios." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Stream Setup
    const encoder = new TextEncoder();

    if (apiKey) {
      // Prompt Engineering for Gemini
      const labelTdu = PROFILE_LABELS[tdu] || tdu;
      const deviceACard = getSpecsSummary(deviceA, deviceA.category);
      const deviceBCard = getSpecsSummary(deviceB, deviceB.category);

      const prompt = `
Você é o Mouse, o carismático e ultra-inteligente mascote de tecnologia do HardDex.
Sua tarefa é dar uma opinião clara, descontraída e extremamente abalizada tecnicamente sobre qual dos dois dispositivos comparados é melhor para o perfil de usuário: "${labelTdu}".

Abaixo estão os dados dos dois dispositivos:

---
DISPOSITIVO A: ${deviceA.brand} ${deviceA.model} (${deviceA.category === "phone" ? "Smartphone" : "Notebook"})
${deviceACard}

---
DISPOSITIVO B: ${deviceB.brand} ${deviceB.model} (${deviceB.category === "phone" ? "Smartphone" : "Notebook"})
${deviceBCard}
---

Instruções importantes:
1. Apresente-se de forma amigável no início como o mascote Mouse ("Oi, aqui é o Mouse! 🐱" ou similar).
2. Analise os aspectos chave mais relevantes especificamente para o perfil de usuário: "${labelTdu}". Ignore specs irrelevantes para este perfil.
3. Compare os valores chave (como velocidade de leitura, TFLOPS, refresh rate, bateria ou preço) justificando por que um se sobressai.
4. Escolha claramente um vencedor no final (ou declare empate técnico se forem extremamente parecidos para este perfil de uso).
5. Escreva de forma conversacional em português (Brasil), usando formatação Markdown (negrito para specs importantes, parágrafos limpos, talvez emojis).
6. Limite a resposta a cerca de 3 parágrafos ou bullet points objetivos para caber em um balão de conversa do chat. Não seja prolixo.
`;

      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        if (!geminiRes.ok) {
          throw new Error("Erro de conexão com a API do Gemini.");
        }

        // Return a custom stream that reads from Gemini and forwards only the text chunks
        const customStream = new ReadableStream({
          async start(controller) {
            const reader = geminiRes.body?.getReader();
            if (!reader) {
              controller.close();
              return;
            }

            const decoder = new TextDecoder();
            let buffer = "";

            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                // Save the last partial line back to the buffer
                buffer = lines.pop() || "";

                for (const line of lines) {
                  const trimmed = line.trim();
                  if (!trimmed) continue;

                  // Gemini SSE stream responses can start with comma or brackets
                  // Format: [{ "candidates": ... }] or ,{ "candidates": ... }
                  let cleanLine = trimmed;
                  if (cleanLine.startsWith(",")) {
                    cleanLine = cleanLine.substring(1).trim();
                  }
                  if (cleanLine.startsWith("[") || cleanLine.startsWith("]")) {
                    continue;
                  }

                  try {
                    const parsed = JSON.parse(cleanLine);
                    const text =
                      parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                      controller.enqueue(encoder.encode(text));
                    }
                  } catch (e) {
                    // Ignore JSON parsing errors for partial/malformed lines during streaming
                  }
                }
              }

              // Parse remaining buffer
              if (buffer.trim()) {
                let cleanLine = buffer.trim();
                if (cleanLine.startsWith(",")) {
                  cleanLine = cleanLine.substring(1).trim();
                }
                try {
                  const parsed = JSON.parse(cleanLine);
                  const text =
                    parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (text) {
                    controller.enqueue(encoder.encode(text));
                  }
                } catch (e) {}
              }
            } catch (err) {
              console.error("Erro ao processar stream do Gemini:", err);
              controller.error(err);
            } finally {
              controller.close();
            }
          },
        });

        return new Response(customStream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      } catch (geminiError) {
        console.warn(
          "Falha ao chamar a API do Gemini. Usando fallback inteligente local...",
          geminiError
        );
      }
    }

    // Fallback: Smart local comparison generated server-side and streamed to look realistic
    const fallbackText = generateSmartFallbackText(deviceA, deviceB, tdu);

    const fallbackStream = new ReadableStream({
      async start(controller) {
        // Stream the text character by character or word by word to simulate real-time AI generation
        const words = fallbackText.split(" ");
        let i = 0;

        async function sendNextWord() {
          if (i >= words.length) {
            controller.close();
            return;
          }

          // Send a batch of words or word by word
          const chunk = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(encoder.encode(chunk));
          i++;

          // Variable delay for natural feel (around 30-70ms)
          const delay = 25 + Math.random() * 30;
          setTimeout(sendNextWord, delay);
        }

        sendNextWord();
      },
    });

    return new Response(fallbackStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err: any) {
    console.error("Erro no manipulador API Mouse Opinion:", err);
    return NextResponse.json(
      { error: err.message || "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
