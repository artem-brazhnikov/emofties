import { deployments, ethers, getNamedAccounts } from "hardhat"
import { EmoftiesProtocol } from "../../typechain-types"
import { assert, expect } from "chai"

describe("EmoftiesProtocol", () => {
  let deployer: string
  let emofties: EmoftiesProtocol
  const oneEther = ethers.utils.parseEther("1")

  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer
    await deployments.fixture("all")
    emofties = await ethers.getContract("EmoftiesProtocol", deployer)
  })

  describe("claimSoulboundEmofty", () => {
    it("Fails when non-core emotion claimed", async () => {
      const emotionHash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("JOYX")
      )
      await expect(
        emofties.claimSoulboundEmofty(emotionHash, "")
      ).to.be.revertedWithCustomError(emofties, "NonCoreEmotionsCantBeClaimed")
    })

    it("Mints soulbound NFT for core emotion", async () => {
      const emotionHash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("JOY")
      )

      await emofties.claimSoulboundEmofty(emotionHash, "")

      const balance = await emofties.balanceOf(deployer)
      assert.equal(balance.toNumber(), 1)
      const owner = await emofties.ownerOf(1)
      assert.equal(owner, deployer)
    })
  })

  describe("shareEmofty", () => {
    it("Creates a shared emofty", async () => {
      const coreEmotionHash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("JOY")
      )
      const emotionShadeHash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("EXCITEMENT")
      )
      console.log(coreEmotionHash)
      const sharedEmotion: EmoftiesProtocol.SharedEmotionStruct = {
        coreEmotion: coreEmotionHash,
        emotionShade: emotionShadeHash,
        associatedTx: ethers.utils.formatBytes32String("0x"),
        timestamp: 0,
        receiver: "0x0000000000000000000000000000000000000000",
        memo: "",
      }

      await emofties.shareEmofty(sharedEmotion, "")
      const balance = await emofties.balanceOf(deployer)
      assert.equal(balance.toNumber(), 0)
    })
  })
})
