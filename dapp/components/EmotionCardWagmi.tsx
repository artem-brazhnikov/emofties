import React from "react"
import { Box, Image, Badge, Button, Spinner, Stack } from "@chakra-ui/react"
import { CoreEmotion } from "../hooks/EmoftiesHooks"
import { EmoftiesProtocol } from "../../typechain-types/contracts/EmoftiesProtocol"
import { formatBytes32String, keccak256, toUtf8Bytes } from "ethers/lib/utils"
import { useAccount, useProvider, useSigner, useContract } from "wagmi"
import { ethers } from "ethers"
import { emoftiesProtocolAddress } from "../hooks"
import EmoftiesAbi from "../../artifacts/contracts/EmoftiesProtocol.sol/EmoftiesProtocol.json"

type Props = {
    coreEmotionName: CoreEmotion
    imageUrl: string
}

export default function EmotionCardWagmi({ imageUrl, coreEmotionName }: Props) {
    const { address, isConnecting, isConnected } = useAccount()
    console.log(`is isConnected ${isConnected}`)

    const [emoftiesBalance, setSharedEmoftiesBalance] = React.useState(0)
    const [sbtEmoftiesBalance, setSBTEmoftiesBalance] = React.useState(0)
    const [lastTxReceipt, setLastTxReceipt] =
        React.useState<ethers.ContractReceipt>()
    const [claimLoading, setClaimLoading] = React.useState(false)
    const [shareLoading, setShareLoading] = React.useState(false)

    const { data: signer, isError, isLoading } = useSigner()
    const emofties = useContract({
        address: emoftiesProtocolAddress,
        abi: EmoftiesAbi.abi,
        signerOrProvider: signer,
    }) as EmoftiesProtocol

    const claimEmofty = async () => {
        setClaimLoading(true)
        const hashedEmmotion = keccak256(toUtf8Bytes(coreEmotionName))

        try {
            const tx = await emofties.claimSoulboundEmofty(hashedEmmotion, "")
            const txReceipt = await tx.wait()
            setLastTxReceipt(txReceipt)
        } catch (err) {
            console.error(err)
        }

        setClaimLoading(false)
    }

    const shareEmofty = async () => {
        setShareLoading(true)

        const sharedEmotion: EmoftiesProtocol.SharedEmotionStruct = {
            coreEmotion: keccak256(toUtf8Bytes(coreEmotionName)),
            emotionShade: keccak256(toUtf8Bytes("Excitement")),
            associatedTx: formatBytes32String("0x"),
            timestamp: 0, // input ignored
            receiver: "0x0000000000000000000000000000000000000000",
            memo: "Hello World",
        }

        try {
            const tx = await emofties.shareEmofty(sharedEmotion, "uri")
            const txReceipt = await tx.wait()
            setLastTxReceipt(txReceipt)
        } catch (err) {
            console.error(err)
        }
        setShareLoading(false)
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
    }, [isConnected, lastTxReceipt])

    React.useEffect(() => {
        const getSoulboundEmofty = async () => {
            const hashedEmmotion = keccak256(toUtf8Bytes(coreEmotionName))
            const balance = await emofties.getSoulboundEmofty(hashedEmmotion)
            setSBTEmoftiesBalance(balance.toNumber() != 0 ? 1 : 0)
        }
        getSoulboundEmofty()
    }, [isConnected, lastTxReceipt])

    if (isLoading || isConnecting) {
        return (
            <div>
                Loading...
                <Spinner size="xl" color="red.500" />
            </div>
        )
    } else {
        return (
            <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
            >
                <Image
                    src={imageUrl}
                    alt={coreEmotionName}
                    objectFit="fill"
                    boxSize="300px"
                    width="380px"
                />
                <Stack marginLeft={6} marginTop={5} direction="row" spacing={4}>
                    <Button
                        isLoading={claimLoading}
                        loadingText="Submitting"
                        colorScheme="teal"
                        variant="solid"
                        onClick={() => claimEmofty()}
                    >
                        Claim SBT Emofty
                    </Button>
                    <Button
                        isLoading={shareLoading}
                        loadingText="Submitting"
                        colorScheme="teal"
                        variant="solid"
                        onClick={() => shareEmofty()}
                    >
                        Share Emofty
                    </Button>
                </Stack>

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
}
