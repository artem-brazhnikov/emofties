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
  unixTime: z.string(),
  coreEmotion: z.string().max(66),
  emotionShade: z.string().max(20),
})

export type Emofty = z.infer<typeof Emofty>
export type TxData = {
  tags: { name: string; value: string }[]
  data: string
}

const generateArweaveKey = async (): Promise<JWKInterface> => {
  const key = await arweave.wallets.generate()
  const addr = await arweave.wallets.jwkToAddress(key)
  const tokens = arweave.ar.arToWinston("100")
  console.log(`Addr: ${addr}, AR winstons: ${tokens}`)
  // mint some tokens
  await arweave.api.get(`mint/${addr}/${tokens}`)
  await arweave.api.get("mine")
  return key
}

let key: JWKInterface | undefined
generateArweaveKey()
  .then((resKey) => (key = resKey))
  .catch((err) => console.error("Arweve gen key error", err))

const parseEmoftyTx = (tx: any) => {
  try {
    return Emofty.parse({
      id: tx.id,
      unixTime: tx.tags.find((tag: Tag) => tag.name === "Unix-Time").value,
      coreEmotion: tx.tags.find((tag: Tag) => tag.name === "Core-Emotion")
        .value,
      emotionShade: tx.tags.find((tag: Tag) => tag.name === "Emotion-Shade")
        .value,
    })
  } catch (err) {
    console.error(err)
    return null
  }
}

const prepareEmoftyTx = (
  formData: any,
  contentType: string | "text/plain",
  version: string | "0.1"
): TxData => {
  return {
    tags: [
      { name: "App-Name", value: "Emofties" },
      { name: "Protocol", value: "Emofties" },
      { name: "Content-Type", value: contentType },
      { name: "App-Version", value: version },
      { name: "Unix-Time", value: formData.unixTime },
      { name: "Core-Emotion", value: formData.coreEmotion },
      { name: "Emotion-Shade", value: formData.emotionShade },
    ],
    data: formData.memo,
  }
}

const publishEmoftyTransaction = async (txData: TxData) => {
  let tx = await arweave.createTransaction(
    {
      data: txData.data,
    },
    key ?? "use_wallet"
  )
  txData.tags.map(({ name, value }) => tx.addTag(name, value))
  await arweave.transactions.sign(tx, key ?? "use_wallet")

  const uploader = await arweave.transactions.getUploader(tx)
  while (!uploader.isComplete) {
    await uploader.uploadChunk()
    console.log(`${uploader.pctComplete}%`)
  }
}

const queryEmoftyTransactions = async () => {
  const queryObject = {
    query: `{
      transactions(
        first: 100,
        tags: [{
            name: "App-Name",
            values: ["Emofties"]
          }]
      ) {
        edges {
          node {
            id
            tags {
              name
              value
            }
            data {
              size
            }
          }
        }
      }
    }
    `,
  }

  const results = await arweave.api
    .post("/graphql", queryObject)
    .catch((err) => {
      console.log("GraphQl query failed")
      throw new Error(err)
    })
  console.log("Arweave query results", results)
  return results?.data?.data?.transactions?.edges
}

export {
  generateArweaveKey,
  publishEmoftyTransaction,
  queryEmoftyTransactions,
  prepareEmoftyTx,
  parseEmoftyTx,
}
