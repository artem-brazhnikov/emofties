import { z } from "zod"
import Arweave from "arweave"
import { Tag } from "arweave/node/lib/transaction"
import { JWKInterface } from "arweave/node/lib/wallet"

export const arweave = Arweave.init({
  host: import.meta.env.VITE_ARWEAVE_SERVER || "arweave.net",
  port: import.meta.env.VITE_ARWEAVE_PORT || 443,
  protocol: import.meta.env.VITE_ARWEAVE_NETWORK_PROTOCOL || "https",
})

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

export const createDummyEmoftyTx = (
  formData: any,
  contentType: string | "text/plain",
  version: string | "0.1"
) => {
  return {
    tags: [
      { name: "App-Name", value: "Emofties-Dapp" },
      { name: "Protocol", value: "Emofties" },
      { name: "Content-Type", value: contentType },
      { name: "App-Version", value: version },
      { name: "Unx-Time", value: 1675333392 },
      { name: "Core-Emotion", value: "JOY" },
      { name: "Emotion-Shade", value: "SATISFACTION" },
      { name: "Emoji", value: "x" },
      { name: "Chain-Id", value: "1" },
      { name: "Chain-Tx", value: "0x" },
    ],
  }
}

const generateArweaveKey = async (): Promise<JWKInterface> => {
  const key = await arweave.wallets.generate()
  const addr = await arweave.wallets.jwkToAddress(key)
  const tokens = arweave.ar.arToWinston("100")
  console.log(`Key: ${key}, Addr: ${addr}, AR winstons: ${tokens}`)
  // mint some tokens
  await arweave.api.get(`mint/${addr}/${tokens}`)
  await arweave.api.get("mine")
  return key
}

const publishEmoftyTransaction = async (
  key: JWKInterface | undefined,
  tags: Tag[]
) => {
  let tx = await arweave.createTransaction(
    {
      data: "Hello World",
      tags,
    },
    key ?? "use_wallet"
  )
  await arweave.transactions.sign(tx, key ?? "use_wallet")

  const uploader = await arweave.transactions.getUploader(tx)
  while (!uploader.isComplete) {
    await uploader.uploadChunk()
    console.log(`${uploader.pctComplete}%`)
  }
}
