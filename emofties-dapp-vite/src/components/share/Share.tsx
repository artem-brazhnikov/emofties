import { BigNumber, utils } from "ethers"
import {
    keccak256,
    toUtf8Bytes,
    formatBytes32String,
    toUtf8String,
} from "ethers/lib/utils.js"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import {
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi"

import { EmoftiesProtocol } from "../../../../typechain-types/contracts/EmoftiesProtocol"
import EmoftiesAbi from "../../../../artifacts/contracts/EmoftiesProtocol.sol/EmoftiesProtocol.json"

export type CoreEmotion =
    | "JOY"
    | "FEAR"
    | "ANGER"
    | "SADNESS"
    | "DISGUST"
    | "LOVE"

export function Share() {
    const [memo, setMemo] = useState<string>("")
    const [debouncedMemo] = useDebounce(memo, 500)

    const [associatedTx, setAssociatedTx] = useState<string>("0x")
    const [debouncedAssociatedTx] = useDebounce(associatedTx, 500)

    const [receiver, setReceiver] = useState<string>(
        "0x0000000000000000000000000000000000000000"
    ) // fails when the address is non-zero???
    const [debouncedReceiver] = useDebounce(receiver, 500)
    console.log("Recevier", debouncedReceiver)
    const sharedEmotion: any = {
        coreEmotion: keccak256(toUtf8Bytes("JOY")),
        emotionShade: keccak256(toUtf8Bytes("Excitement")),
        associatedTx: formatBytes32String(debouncedAssociatedTx),
        timestamp: 0, // input ignored
        receiver: debouncedReceiver,
        memo: debouncedMemo,
    }

    const {
        config: contractWriteConfig,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: "0x2dBa017c6A9c9e6302d973E93Eba7491A8D389f8",
        abi: EmoftiesAbi.abi,
        functionName: "shareEmofty",
        args: [sharedEmotion, "uri"],
        overrides: { gasLimit: BigNumber.from(500000) },
    })
    console.log("Contract Write Config", contractWriteConfig)

    const { data, write, isError, error } =
        useContractWrite(contractWriteConfig)
    console.log("write", write)
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                write?.()
            }}
        >
            <div className="p-2">
                <input
                    type="text"
                    placeholder="receiver"
                    onChange={(e) => setReceiver(e.target.value)}
                    value={receiver}
                />
            </div>
            <div className="p-2">
                <input
                    type="text"
                    placeholder="tx id"
                    onChange={(e) => setAssociatedTx(e.target.value)}
                    value={associatedTx}
                />
            </div>
            <div className="p-2">
                <input
                    type="text"
                    placeholder="memo"
                    onChange={(e) => setMemo(e.target.value)}
                    value={memo}
                />
            </div>
            <select name="core-emotion" id="">
                <option value="JOY">JOY</option>
                <option value="FEAR">FEAR</option>
                <option value="ANGER">ANGER</option>
                <option value="SADNESS">SADNESS</option>
                <option value="DISGUST">DISGUST</option>
                <option value="LOVE">LOVE</option>
            </select>
            <div>
                <button
                    className="text-white bg-green-700 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5"
                    disabled={
                        isLoading ||
                        !write ||
                        !receiver ||
                        !memo ||
                        !associatedTx
                    }
                >
                    {isLoading ? "Sharing..." : "Share"}
                </button>
                {isSuccess && (
                    <div>
                        Successfully shared to {receiver}
                        <div>
                            <a
                                href={`https://goerli.etherscan.io/tx/${data?.hash}`}
                            >
                                Etherscan
                            </a>
                        </div>
                    </div>
                )}
            </div>
            {(isPrepareError || isError) && (
                <div>Error: {(prepareError || error)?.message}</div>
            )}
        </form>
    )
}
