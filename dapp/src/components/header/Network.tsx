import { goerli, useNetwork } from "wagmi"

const Network = () => {
    const { chain: connectedChain, chains } = useNetwork()
    console.log("Chains", chains)
    return (
        <div>
            <select
                name="chains"
                className="select select-primary w-full max-w-xs"
            >
                {/* <option disabled selected>
                    Select Network
                </option> */}
                {chains && chains.length === 0 && (
                    <option value={goerli.name} selected={true}>
                        {goerli.name}
                    </option>
                )}
                {chains &&
                    chains.length > 0 &&
                    chains.map((chain) => (
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
