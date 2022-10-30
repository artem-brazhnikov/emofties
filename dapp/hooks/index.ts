import { useNetwork } from "@web3modal/react"
// import deployemntsJson from "../../deployments/deployments.json"

// export const emoftiesProtocolAddress =
//   "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export const emoftiesProtocolAddress =
  "0x2dBa017c6A9c9e6302d973E93Eba7491A8D389f8"
export function useCurrentChainId(): number | undefined {
  const { network, isReady } = useNetwork()
  return network?.chain?.id
}

// export function useEmoftiesCurrentChainAddress(): string {
//   const { network, isReady } = useNetwork()
//   if (network && network.chain && network.chain.id) {
//     const address =
//       deployemntsJson[network.chain.id as str].contracts.EmoftiesProtocol
//         .address
//     console.log(address)
//     return address
//   }
// }
