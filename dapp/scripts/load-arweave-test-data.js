// const Arweave = require("arweave")
import Arweave from "arweave"
import fs from "fs"
import input from "./data/1.json" assert { type: "json" }
// import data from "./data/image1.png"
import input2 from "./data/2.json" assert { type: "json" }
// import data2 from "./data/image2.png"

const arweave = Arweave.init({
  host: "localhost",
  port: "1984",
  protocol: "http",
})

;(async () => {
  const w = await arweave.wallets.generate()
  const addr = await arweave.wallets.jwkToAddress(w)
  const tokens = arweave.ar.arToWinston(100)
  // mint some tokens
  await arweave.api.get(`mint/${addr}/${tokens}`)
  await arweave.api.get("mine")

  // add data1

  let tx = await arweave.createTransaction(
    {
      data: "x",
    },
    w
  )
  input.tags.map((tag) => {
    tx.addTag(tag.name, tag.value)
  })
  await arweave.transactions.sign(tx, w)
  let uploader = await arweave.transactions.getUploader(tx)
  while (!uploader.isComplete) {
    await uploader.uploadChunk()
    console.log(
      `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
    )
  }
  await arweave.api.get("mine")

  // add data2
  tx = await arweave.createTransaction(
    {
      data: "y", //data2,
    },
    w
  )
  input2.tags.map((tag) => {
    tx.addTag(tag.name, tag.value)
  })
  await arweave.transactions.sign(tx, w)
  uploader = await arweave.transactions.getUploader(tx)
  while (!uploader.isComplete) {
    await uploader.uploadChunk()
    console.log(
      `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
    )
  }
  await arweave.api.get("mine")

  console.log("done")
})()
