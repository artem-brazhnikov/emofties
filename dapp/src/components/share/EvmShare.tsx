import { BigNumber } from "ethers"
import {
    keccak256,
    toUtf8Bytes,
    formatBytes32String,
    getAddress,
    arrayify,
} from "ethers/lib/utils.js"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import {
    useAccount,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi"

import EmoftiesAbi from "../../../../artifacts/contracts/EmoftiesProtocol.sol/EmoftiesProtocol.json"
import EmoftyCard from "../emofties/EmoftyCard"
import {
    CoreEmotion,
    emotionsMap,
    getCoreEmotionColor,
} from "../../emofties-lib"

const EvmShare = () => {
    const [coreEmotion, setCoreEmotion] = useState<string>("")
    const [emotionShade, setEmotionsShade] = useState<string>("")
    const [memo, setMemo] = useState<string>("")
    const [debouncedMemo] = useDebounce(memo, 500)

    const [associatedTx, setAssociatedTx] = useState<string>("")
    const [debouncedAssociatedTx] = useDebounce(associatedTx, 500)

    const [receiver, setReceiver] = useState<string>("")
    const [debouncedReceiver] = useDebounce(receiver, 500)

    const { address: sender, isConnected } = useAccount()

    const preparedParams: any = {
        coreEmotion: keccak256(toUtf8Bytes(coreEmotion)),
        emotionShade: formatBytes32String(emotionShade),
        associatedTx:
            formatBytes32String("0x") ?? arrayify(debouncedAssociatedTx),
        timestamp: 0, // input ignored
        receiver:
            "0x0000000000000000000000000000000000000000" ??
            getAddress(debouncedReceiver),
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
        args: [preparedParams, "uri"],
        overrides: { gasLimit: BigNumber.from(500000) },
    })

    const { data, write, isError, error } =
        useContractWrite(contractWriteConfig)
    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

    const setShadowColor = (checkEmotion: CoreEmotion) => {
        return coreEmotion === checkEmotion
            ? getCoreEmotionColor(coreEmotion)
            : ""
    }

    return (
        <div className="flex gap-20 m-7 justify-start">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    write?.()
                }}
            >
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">
                            Emotion for Your Emofty
                        </span>
                        <span className="label-text-alt">Mandatory</span>
                    </label>
                    <select
                        name="emotion-shade"
                        className="select select-bordered select-secondary"
                        onChange={(e) => {
                            setEmotionsShade(e.target.value)
                            setCoreEmotion(
                                emotionsMap
                                    .get(e.target.value)
                                    ?.toUpperCase() ?? ""
                            )
                        }}
                    >
                        <option disabled selected>
                            Choose Your Emotion
                        </option>
                        {[...emotionsMap.keys()].map((key) => (
                            <option>{key}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Core Emotions</span>
                        <span className="label-text-alt">Mandatory</span>
                    </label>
                    <div className="flex flex-wrap gap-6 justify-between mb-2">
                        <div
                            className={`${setShadowColor(
                                CoreEmotion.Joy
                            )} badge badge-outline badge-lg gap-2 shadow-lg hover:shadow-xl hover:shadow-yellow-200`}
                        >
                            Joy
                        </div>
                        <div
                            className={`${setShadowColor(
                                CoreEmotion.Sadness
                            )} badge badge-outline badge-lg gap-2 shadow-lg hover:shadow-xl hover:shadow-cyan-500`}
                        >
                            Sadness
                        </div>
                        <div
                            className={`${setShadowColor(
                                CoreEmotion.Love
                            )} badge badge-outline badge-lg gap-2 shadow-lg hover:shadow-xl hover:shadow-pink-300`}
                        >
                            Love
                        </div>
                        <div
                            className={`${setShadowColor(
                                CoreEmotion.Anger
                            )} badge badge-outline badge-lg gap-2 shadow-lg hover:shadow-xl hover:shadow-red-400`}
                        >
                            Anger
                        </div>
                        <div
                            className={`${setShadowColor(
                                CoreEmotion.Disgust
                            )} badge badge-outline badge-lg gap-2 shadow-lg hover:shadow-xl hover:shadow-green-300`}
                        >
                            Disgust
                        </div>
                        <div
                            className={`${setShadowColor(
                                CoreEmotion.Fear
                            )} badge badge-outline badge-lg gap-2 shadow-lg hover:shadow-xl hover:shadow-purple-400`}
                        >
                            Fear
                        </div>
                    </div>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Memo</span>
                        <span className="label-text-alt">Mandatory</span>
                    </label>
                    <input
                        className="input input-bordered input-secondary w-full max-w-xs"
                        type="text"
                        placeholder="memo"
                        onChange={(e) => setMemo(e.target.value)}
                        value={memo}
                    />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">
                            Transaction ID to Emote
                        </span>
                        <span className="label-text-alt">Optional</span>
                    </label>
                    <input
                        className="input input-bordered input-secondary w-full max-w-xs"
                        type="text"
                        placeholder="Transaction ID"
                        onChange={(e) => setAssociatedTx(e.target.value)}
                        value={associatedTx}
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">
                            Emofty Receiver Address
                        </span>
                        <span className="label-text-alt">Optional</span>
                    </label>
                    <input
                        className="input input-bordered input-secondary w-full max-w-xs"
                        type="text"
                        placeholder="Receiver"
                        onChange={(e) => setReceiver(e.target.value)}
                        value={receiver}
                    />
                </div>

                <div>
                    <button
                        className="btn btn-accent my-4"
                        disabled={
                            !write ||
                            !emotionShade ||
                            !coreEmotion ||
                            !memo ||
                            isLoading
                        }
                    >
                        {isLoading ? "Sharing..." : "Share"}
                    </button>
                    {isSuccess && (
                        <div>
                            Successfully shared
                            <div>
                                <a
                                    className="link link-primary"
                                    href={`https://goerli.etherscan.io/tx/${data?.hash}`}
                                    target="_blank"
                                >
                                    {`https://goerli.etherscan.io/tx/${data?.hash}`}
                                </a>
                            </div>
                        </div>
                    )}
                </div>
                {(isPrepareError || isError) && (
                    <div>Error: {(prepareError || error)?.message}</div>
                )}
            </form>
            <EmoftyCard
                emofty={{
                    sender: isConnected ? sender : "",
                    coreEmotion: preparedParams.coreEmotion,
                    emotionShade: preparedParams.emotionShade,
                    associatedTx,
                    receiver,
                    memo,
                }}
            />
        </div>
    )
}

export default EvmShare
