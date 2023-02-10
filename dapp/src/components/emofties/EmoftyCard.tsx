import {
    hexlify,
    keccak256,
    parseBytes32String,
    toUtf8Bytes,
} from "ethers/lib/utils.js"
// import { Emofty } from "../../../../subgraph-goerli/generated/schema"

const coreEmotionsMap = (() => {
    const emotionsMap: Map<string, string> = new Map()
    emotionsMap.set(keccak256(toUtf8Bytes("JOY")), "JOY")
    emotionsMap.set(keccak256(toUtf8Bytes("FEAR")), "FEAR")
    emotionsMap.set(keccak256(toUtf8Bytes("ANGER")), "ANGER")
    emotionsMap.set(keccak256(toUtf8Bytes("SADNESS")), "SADNESS")
    emotionsMap.set(keccak256(toUtf8Bytes("DISGUST")), "DISGUST")
    emotionsMap.set(keccak256(toUtf8Bytes("LOVE")), "LOVE")
    return emotionsMap
})()

type Props = {
    emofty: any
    isArweave?: boolean
}
const EmoftyCard = ({ emofty, isArweave = false }: Props) => {
    let parsedEmotionShade
    try {
        if (emofty.emotionShade) {
            if (isArweave) {
                parsedEmotionShade = emofty.emotionShade.toString()
            } else {
                parsedEmotionShade = parseBytes32String(emofty.emotionShade)
            }
        }
    } catch (err) {
        console.error("parseBytes32String error", err)
    }

    const coreEmotionStr = coreEmotionsMap.get(emofty.coreEmotion.toString())
    let shadowColor
    switch (coreEmotionStr) {
        case "JOY":
            shadowColor = "shadow-yellow-200"
            break
        case "FEAR":
            shadowColor = "shadow-purple-400"
            break
        case "ANGER":
            shadowColor = "shadow-red-400"
            break
        case "SADNESS":
            shadowColor = "shadow-cyan-500"
            break
        case "DISGUST":
            shadowColor = "shadow-green-300"
            break
        case "LOVE":
            shadowColor = "shadow-pink-300"
            break
        default:
            shadowColor = "shadow-slate-500"
    }

    return (
        <div className={`card w-96 bg-base-100 shadow-xl ${shadowColor}`}>
            <figure>
                <img
                    src="/assets/emotions-social-graph.jpg"
                    alt="Emofty Image"
                />
            </figure>
            <div className="card-body">
                <a
                    className="badge badge-outline link link-primary tooltip tooltip-left"
                    data-tip="Sender"
                    href={`https://goerli.etherscan.io/address/${emofty.sender}`}
                    target="_blank"
                >
                    {emofty.sender}
                </a>
                {/* <div className="badge badge-primary gap-2">{emofty.sender}</div> */}
                <h2
                    className="card-title tooltip tooltip-left"
                    data-tip="Emotion"
                >
                    {parsedEmotionShade}
                    <div className={`badge badge-secondary`}>
                        {coreEmotionsMap.get(emofty.coreEmotion.toString())}
                    </div>
                </h2>
                {emofty.memo && (
                    <div
                        className="badge badge-outline tooltip tooltip-left"
                        data-tip="Memo"
                    >
                        {emofty.memo}
                    </div>
                )}

                <div className="card-actions">
                    {emofty.receiver &&
                        emofty.receiver.toString() !=
                            "0x0000000000000000000000000000000000000000" && (
                            <a
                                className="badge badge-outline link link-primary tooltip tooltip-left"
                                data-tip="Receiver"
                                href={`https://goerli.etherscan.io/address/${emofty.receiver}`}
                                target="_blank"
                            >
                                {emofty.receiver}
                            </a>
                        )}
                    {emofty.associatedTx &&
                        hexlify(emofty.associatedTx) !==
                            "0x3078000000000000000000000000000000000000000000000000000000000000" && (
                            <a
                                className="badge badge-outline link link-secondary tooltip tooltip-left"
                                data-tip="Associated with Transaction"
                                href={`https://goerli.etherscan.io/tx/${emofty.associatedTx}`}
                                target="_blank"
                            >
                                {`${emofty.associatedTx.slice(
                                    0,
                                    20
                                )}....${emofty.associatedTx.slice(
                                    emofty.associatedTx.length - 20,
                                    emofty.associatedTx.length
                                )}`}
                            </a>
                        )}
                </div>
            </div>
        </div>
    )
}

export default EmoftyCard
