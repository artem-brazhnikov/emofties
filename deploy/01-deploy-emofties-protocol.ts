import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { network } from "hardhat"
import { developmentChains } from "../helper-hardhat-config"
import { verify } from "../utils/verify"

const func: DeployFunction = async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const emoftiesProtocol = await deploy("EmoftiesProtocol", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(emoftiesProtocol.address, [])
  }
  log("=============================================================")
}

export default func
module.exports.tags = ["all", "emofties"]
