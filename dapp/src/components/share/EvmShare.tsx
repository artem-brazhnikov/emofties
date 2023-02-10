import { BigNumber } from "ethers"
import {
    keccak256,
    toUtf8Bytes,
    formatBytes32String,
    toUtf8String,
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
import { CoreEmotion } from "../../emofties-lib"

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
                            Specific Emotion for Emofty
                        </span>
                        <span className="label-text-alt">Mandatory</span>
                    </label>
                    <select
                        name="core-emotion"
                        className="select select-bordered select-secondary"
                        onChange={(e) => setEmotionsShade(e.target.value)}
                    >
                        <option disabled selected>
                            Describe Your Emotion
                        </option>
                        <option>happiness</option>
                        <option>love</option>
                        <option>relief</option>
                        <option>contentment</option>
                        <option>amusement</option>
                        <option>joy</option>
                        <option>pride</option>
                        <option>excitement</option>
                        <option>peace</option>
                        <option>satisfaction</option>
                        <option>lonely</option>
                        <option>heartbroken</option>
                        <option>gloomy</option>
                        <option>disappointed</option>
                        <option>hopeless</option>
                        <option>grieved</option>
                        <option>unhappy</option>
                        <option>lost</option>
                        <option>troubled</option>
                        <option>resigned</option>
                        <option>miserable</option>
                        <option>worried</option>
                        <option>doubtful</option>
                        <option>nervous</option>
                        <option>anxious</option>
                        <option>terrified</option>
                        <option>panicked</option>
                        <option>horrified</option>
                        <option>desperate</option>
                        <option>confused</option>
                        <option>stressed</option>
                        <option>annoyed</option>
                        <option>frustrated</option>
                        <option>peeved</option>
                        <option>contrary</option>
                        <option>bitter</option>
                        <option>infuriated</option>
                        <option>irritated</option>
                        <option>mad</option>
                        <option>cheated</option>
                        <option>vengeful</option>
                        <option>insulted</option>
                        <option>dislike</option>
                        <option>revulsion</option>
                        <option>loathing</option>
                        <option>disapproving</option>
                        <option>offended</option>
                        <option>horrified</option>
                        <option>uncomfortable</option>
                        <option>nauseated</option>
                        <option>disturbed</option>
                        <option>withdrawn</option>
                        <option>aversion</option>
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">
                            Core Emotion for Emofty
                        </span>
                        <span className="label-text-alt">Mandatory</span>
                    </label>
                    <select
                        name="core-emotion"
                        className="select select-bordered select-secondary"
                        onChange={(e) => setCoreEmotion(e.target.value)}
                    >
                        <option disabled selected>
                            Chose Core Emotion
                        </option>
                        <option value="JOY">joy</option>
                        <option value="FEAR">fear</option>
                        <option value="ANGER">anger</option>
                        <option value="SADNESS">sadness</option>
                        <option value="DISGUST">disgust</option>
                        <option value="LOVE">love</option>
                    </select>
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
