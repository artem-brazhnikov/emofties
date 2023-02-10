import { hexlify, parseBytes32String } from "ethers/lib/utils.js"
import socialGraphImage from "../../../assets/emotions-social-graph.jpg"
import {
    CoreEmotion,
    coreEmotionsMap,
    getCoreEmotionColor,
} from "../../emofties-lib"

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

    let shadowColor = getCoreEmotionColor(
        coreEmotionsMap.get(emofty.coreEmotion.toString())
    )

    return (
        <div
            className={`card w-96 bg-base-100 shadow-lg ${shadowColor} hover:shadow-xl hover:${shadowColor}`}
        >
            <figure>
                <img src={socialGraphImage} alt="Emofty Image" />
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
