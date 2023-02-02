import { z } from "zod"

const Emofty = z.object({
  id: z.string(),
  unixTime: z.number(),
  coreEmotion: z.string().max(7),
  emotionShade: z.string().max(20),
  emoji: z.string().max(4), //temp
  chainId: z.number(),
  chainTx: z.string().max(66),
})

type Emofty = z.infer<typeof Emofty>
type Tag = {
  name: string
  value: string
}

export const parseEmoftyTx = (tx: any) => {
  try {
    return Emofty.parse({
      id: tx.id,
      unixTime: tx.tags.find((tag: Tag) => tag.name === "Unix-Time").value,
      coreEmotion: tx.tags.find((tag: Tag) => tag.name === "Core-Emotion")
        .value,
      emotionShade: tx.tags.find((tag: Tag) => tag.name === "Emotion-Shade")
        .value,
      emoji: tx.tags.find((tag: Tag) => tag.name === "Emoji").value,
      chainId: tx.tags.find((tag: Tag) => tag.name === "Chain-Id").value,
      chainTx: tx.tags.find((tag: Tag) => tag.name === "Chain-Tx").value,
    })
  } catch (err) {
    console.error(err)
    return null
  }
}

export const createEmoftyTx = (
  formData: any,
  contentType: string,
  version: string
) => {
  return {
    tags: [
      { name: "App-Name", value: "Emofties-Dapp" },
      { name: "Protocol", value: "Emofties" },
      { name: "Content-Type", value: contentType },
      { name: "App-Version", value: version },
      { name: "Unx-Time", value: formData.unixTime },
      { name: "Core-Emotion", value: formData.coreEmotion },
      { name: "Emotion-Shade", value: formData.emotionShade },
      { name: "Emoji", value: formData.emoji },
      { name: "Chain-Id", value: formData.chainId },
      { name: "Chain-Tx", value: formData.chainTx },
    ],
  }
}
