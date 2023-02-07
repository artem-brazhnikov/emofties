import { keccak256, parseBytes32String, toUtf8Bytes } from "ethers/lib/utils.js"
import { Emofty } from "../../../../subgraph-goerli/generated/schema"

type CoreEmotion = "JOY" | "FEAR" | "ANGER" | "SADNESS" | "DISGUST" | "LOVE"

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
    emofty: Emofty
}
const EmoftyCard = ({ emofty }: Props) => {
    let parsedEmotionShade = "No Emotion Shade"
    try {
        if (emofty.emotionShade) {
            parsedEmotionShade = parseBytes32String(emofty.emotionShade)
        }
    } catch (err) {
        console.error("parseBytes32String error", err)
    }
    return (
        <div className="flex flex-col gap-2 justify-evenly items-center p-3 rounded-lg shadow-cyan-500 shadow-lg">
            <div className="shadow-lg rounded-md p-1 shadow-pink-400">
                {coreEmotionsMap.get(emofty.coreEmotion.toString())}
            </div>
            <div>{parsedEmotionShade}</div>
            <div>{emofty.sender}</div>
            <div>{emofty.emoftyId}</div>
            <div>{emofty.receiver}</div>
            <div>{emofty.memo}</div>
        </div>
    )
}

export default EmoftyCard
