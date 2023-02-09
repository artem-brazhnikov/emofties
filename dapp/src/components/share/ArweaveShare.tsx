import { BigNumber } from "ethers"
import {
    keccak256,
    toUtf8Bytes,
    formatBytes32String,
} from "ethers/lib/utils.js"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import {
    prepareEmoftyTx,
    publishEmoftyTransaction,
} from "../../services/ArweaveEmofties"

export type CoreEmotion =
    | "JOY"
    | "FEAR"
    | "ANGER"
    | "SADNESS"
    | "DISGUST"
    | "LOVE"

const ArweaveShare = () => {
    const isLoading = false

    const [coreEmotion, setCoreEmotion] = useState<string>("")
    const [emotionShade, setEmotionsShade] = useState<string>("")
    const [memo, setMemo] = useState<string>("")
    const [debouncedMemo] = useDebounce(memo, 500)

    const [receiver, setReceiver] = useState<string>(
        "0x0000000000000000000000000000000000000000"
    ) // fails when the address is non-zero???
    const [debouncedReceiver] = useDebounce(receiver, 500)

    const sharedEmotion: any = {
        coreEmotion: keccak256(toUtf8Bytes(coreEmotion)),
        emotionShade: emotionShade,
        unixTime: Math.round(new Date().getTime() / 1000),
        receiver: debouncedReceiver,
        memo: debouncedMemo,
    }
    const emoftyTxData = prepareEmoftyTx(sharedEmotion, "text/plain", "0.1")
    console.log("emofty tx data", emoftyTxData)

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                publishEmoftyTransaction(emoftyTxData)
            }}
        >
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">
                        Specific Emotion for Your Emofty
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
                        Core Emotion for Your Emofty
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
                    <span className="label-text">Emofty Receiver Address</span>
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
                        !emotionShade || !coreEmotion || !receiver || !memo
                    }
                >
                    {isLoading ? "Sharing..." : "Share"}
                </button>
            </div>
        </form>
    )
}

export default ArweaveShare
