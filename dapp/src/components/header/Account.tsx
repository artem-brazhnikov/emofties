import {
    useAccount,
    useConnect,
    useEnsName,
    useEnsAvatar,
    useDisconnect,
} from "wagmi"

import { ConnectResult, Provider } from "@wagmi/core"
import { useState } from "react"

const Account = () => {
    const [connectRes, setConnectRes] = useState<ConnectResult<Provider>>()

    const {
        connect,
        // connectAsync,
        connectors,
        // data: connectData,
        error,
        isError,
        // isIdle,
        isLoading,
        // isSuccess,
        pendingConnector,
        // reset,
        // status: connectStatus,
    } = useConnect({
        onError: (error) => console.error("[Wagmi Connect]", error),
        onMutate: (connector) =>
            console.log("[Wagmi Connect] Before connect", connector),
        onSettled: (data: ConnectResult<Provider> | undefined, error) => {
            console.log("[Wagmi Connect] Settled", { data, error })
            setConnectRes(data)
        },
    })

    const {
        address,
        // connector,
        // isConnecting,
        // isReconnecting,
        isConnected,
        isDisconnected,
        // status: accountStatus,
    } = useAccount({
        onConnect: ({ address, connector, isReconnected }) => {
            console.log(
                `[Wagmi useAccount] Connected. Addr: ${address}; C-tor: ${connector}; isRecon: ${isReconnected}`
            )
        },
        onDisconnect: () => console.log("Disconnected"),
    })

    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { disconnect } = useDisconnect({
        onError: (error) => console.error("[Wagmi Disconnect]", error),
        onMutate: () => console.log("[Wagmi Disconnect] Before disconnect"),
        onSettled: (data, error) =>
            console.log("[Wagmi Disconnect] Settled", { data, error }),
    })

    return (
        <div>
            {/* Connect Button */}
            {connectors.map((connector) => (
                <button
                    className="btn btn-primary"
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() =>
                        isConnected ? disconnect() : connect({ connector })
                    }
                >
                    {isConnected && (
                        <span>
                            {ensAvatar && (
                                <img
                                    src={ensAvatar as string}
                                    alt="ENS Avatar"
                                />
                            )}
                            {ensName ? ensName : address}
                            {` Disconnect from ${connector?.name} `}
                        </span>
                    )}
                    {isDisconnected && <span>Connect to {connector.name}</span>}
                    {isLoading &&
                        pendingConnector?.id === connector.id &&
                        `Connecting to ${connector.name}`}
                </button>
            ))}
            {/* Error Processing */}
            {isError && <div>{error?.message}</div>}
        </div>
    )
}

export default Account
