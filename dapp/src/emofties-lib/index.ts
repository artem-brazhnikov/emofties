import { keccak256, toUtf8Bytes } from "ethers/lib/utils.js"

export enum CoreEmotion {
  Joy = "JOY",
  Fear = "FEAR",
  Anger = "ANGER",
  Sadness = "SADNESS",
  Disgust = "DISGUST",
  Love = "LOVE",
}

export const emotionsMap = (() => {
  const emotionsMap = new Map<string, string>()
  emotionsMap.set("happiness", "joy")
  emotionsMap.set("relief", "joy")
  emotionsMap.set("contentment", "joy")
  emotionsMap.set("amusement", "joy")
  emotionsMap.set("joy", "joy")
  emotionsMap.set("pride", "joy")
  emotionsMap.set("excitement", "joy")
  emotionsMap.set("peace", "joy")
  emotionsMap.set("satisfaction", "joy")
  emotionsMap.set("love", "love")
  emotionsMap.set("lonely", "sadness")
  emotionsMap.set("heartbroken", "sadness")
  emotionsMap.set("gloomy", "sadness")
  emotionsMap.set("disappointed", "sadness")
  emotionsMap.set("hopeless", "sadness")
  emotionsMap.set("grieved", "sadness")
  emotionsMap.set("unhappy", "sadness")
  emotionsMap.set("lost", "sadness")
  emotionsMap.set("troubled", "sadness")
  emotionsMap.set("resigned", "sadness")
  emotionsMap.set("miserable", "sadness")
  emotionsMap.set("worried", "fear")
  emotionsMap.set("doubtful", "fear")
  emotionsMap.set("nervous", "fear")
  emotionsMap.set("anxious", "fear")
  emotionsMap.set("terrified", "fear")
  emotionsMap.set("panicked", "fear")
  emotionsMap.set("horrified", "fear")
  emotionsMap.set("desperate", "fear")
  emotionsMap.set("confused", "fear")
  emotionsMap.set("stressed", "fear")
  emotionsMap.set("annoyed", "anger")
  emotionsMap.set("frustrated", "anger")
  emotionsMap.set("peeved", "anger")
  emotionsMap.set("contrary", "anger")
  emotionsMap.set("bitter", "anger")
  emotionsMap.set("infuriated", "anger")
  emotionsMap.set("irritated", "anger")
  emotionsMap.set("mad", "anger")
  emotionsMap.set("cheated", "anger")
  emotionsMap.set("vengeful", "anger")
  emotionsMap.set("insulted", "anger")
  emotionsMap.set("dislike", "disgust")
  emotionsMap.set("revulsion", "disgust")
  emotionsMap.set("loathing", "disgust")
  emotionsMap.set("disapproving", "disgust")
  emotionsMap.set("offended", "disgust")
  emotionsMap.set("uncomfortable", "disgust")
  emotionsMap.set("nauseated", "disgust")
  emotionsMap.set("disturbed", "disgust")
  emotionsMap.set("withdrawn", "disgust")
  emotionsMap.set("aversion", "disgust")
  return emotionsMap
})()

export const coreEmotionsMap = (() => {
  const emotionsMap: Map<string, string> = new Map()
  emotionsMap.set(keccak256(toUtf8Bytes(CoreEmotion.Joy)), CoreEmotion.Joy)
  emotionsMap.set(keccak256(toUtf8Bytes(CoreEmotion.Fear)), CoreEmotion.Fear)
  emotionsMap.set(keccak256(toUtf8Bytes(CoreEmotion.Anger)), CoreEmotion.Anger)
  emotionsMap.set(
    keccak256(toUtf8Bytes(CoreEmotion.Sadness)),
    CoreEmotion.Sadness
  )
  emotionsMap.set(
    keccak256(toUtf8Bytes(CoreEmotion.Disgust)),
    CoreEmotion.Disgust
  )
  emotionsMap.set(keccak256(toUtf8Bytes(CoreEmotion.Love)), CoreEmotion.Love)
  return emotionsMap
})()

export const getCoreEmotionColor = (
  coreEmotion: CoreEmotion | string | undefined
) => {
  switch (coreEmotion) {
    case CoreEmotion.Joy:
      return "shadow-yellow-200"
    case CoreEmotion.Fear:
      return "shadow-purple-400"
    case CoreEmotion.Anger:
      return "shadow-red-400"
    case CoreEmotion.Sadness:
      return "shadow-cyan-500"
    case CoreEmotion.Disgust:
      return "shadow-green-300"
    case CoreEmotion.Love:
      return "shadow-pink-300"
    default:
      return "shadow-slate-500"
  }
}
