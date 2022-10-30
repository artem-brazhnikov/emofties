import { useContract, useSigner } from "wagmi"
import { ethers } from "ethers"
import { keccak256, toUtf8Bytes } from "ethers/lib/utils"
import { emoftiesProtocolAddress, useCurrentChainId } from "."
import EmoftiesAbi from "../../artifacts/contracts/EmoftiesProtocol.sol/EmoftiesProtocol.json"
import { EmoftiesProtocol } from "../../typechain-types/contracts/EmoftiesProtocol"

export type CoreEmotion =
    | "JOY"
    | "FEAR"
    | "ANGER"
    | "SADNESS"
    | "DISGUST"
    | "LOVE"

export function useEmofties() {
    return useContract({
        address: emoftiesProtocolAddress,
        abi: EmoftiesAbi.abi,
    })
}

// export function useClaimSoulboundEmofty(coreEmotion: CoreEmotion) {
//     const hashedEmotion = keccak256(toUtf8Bytes(coreEmotion))
//     return useContractWrite({
//         address: emoftiesProtocolAddress,
//         contractInterface: emoftiesProtocolAddress,
//         functionName: "claimSoulboundEmofty",
//         args: [hashedEmotion, ""],
//     })
// }
