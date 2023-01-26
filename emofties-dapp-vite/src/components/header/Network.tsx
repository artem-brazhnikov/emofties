import { useNetwork } from "wagmi"

const Network = () => {
    const { chain: connectedChain, chains } = useNetwork()
    console.log("Chains", chains)
    return (
        <div>
            <select name="chains">
                {chains.map((chain) => (
                    <option
                        value={chain.network}
                        selected={chain.id === connectedChain?.id}
                    >
                        {chain.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Network
