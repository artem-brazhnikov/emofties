import React from "react"
import { Box, Image, Badge, Button, Spinner } from "@chakra-ui/react"
import { CoreEmotion, useEmofties } from "../hooks/EmoftiesHooks"
import { EmoftiesProtocol } from "../../typechain-types/contracts/EmoftiesProtocol"
import { formatBytes32String, keccak256, toUtf8Bytes } from "ethers/lib/utils"
import { useAccount } from "@web3modal/react"

type Props = {
    coreEmotionName: CoreEmotion
    imageUrl: string
}

export default function EmotionCard({ imageUrl, coreEmotionName }: Props) {
    const { account } = useAccount()

    const [emoftiesBalance, setSharedEmoftiesBalance] = React.useState(0)
    const [sbtEmoftiesBalance, setSBTEmoftiesBalance] = React.useState(0)

    const emofties = useEmofties() as EmoftiesProtocol

    const claimEmofty = async () => {
        const hashedEmmotion = keccak256(toUtf8Bytes(coreEmotionName))
        const tx = await emofties.claimSoulboundEmofty(hashedEmmotion, "")
        const txReceipt = await tx.wait()
    }

    const shareEmofty = async () => {
        const sharedEmotion: EmoftiesProtocol.SharedEmotionStruct = {
            coreEmotion: keccak256(toUtf8Bytes(coreEmotionName)),
            emotionShade: keccak256(toUtf8Bytes("Excitement")),
            associatedTx: formatBytes32String("0x"),
            timestamp: 0, // input ignored
            receiver: "0x0000000000000000000000000000000000000000",
            memo: "Hello World",
        }

        const tx = await emofties.shareEmofty(sharedEmotion, "uri")
        const txReceipt = await tx.wait()
    }

    React.useEffect(() => {
        const getEmoftiesForCoreEmotion = async () => {
            const hashedEmmotion = keccak256(toUtf8Bytes(coreEmotionName))
            const balance = await emofties.balanceOfSharedEmofties(
                hashedEmmotion
            )
            setSharedEmoftiesBalance(balance.toNumber())
        }
        getEmoftiesForCoreEmotion()
    })

    React.useEffect(() => {
        const getSoulboundEmofty = async () => {
            const hashedEmmotion = keccak256(toUtf8Bytes(coreEmotionName))
            const balance = await emofties.getSoulboundEmofty(hashedEmmotion)
            setSBTEmoftiesBalance(balance.toNumber() != 0 ? 1 : 0)
        }
        getSoulboundEmofty()
    })

    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            {/* {isLoading && (
                <div>
                    Loading...
                    <Spinner size="xl" color="red.500" />
                </div>
            )}
            {isWaiting && (
                <div>
                    Waiting...
                    <Spinner size="xl" color="grey.200" />
                </div>
            )} */}
            <Button boxSize="300px" onClick={() => shareEmofty()}>
                <Image
                    src={imageUrl}
                    alt={coreEmotionName}
                    objectFit="fill"
                    boxSize="300px"
                />
            </Button>

            <Box p="6">
                <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        {coreEmotionName}
                    </Badge>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                    >
                        {sbtEmoftiesBalance} SBT Emofties &bull;{" "}
                        {emoftiesBalance} Shared Emofties
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
