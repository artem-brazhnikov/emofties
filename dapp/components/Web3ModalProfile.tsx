import { chains, providers } from "@web3modal/ethereum"
import {
    AccountButton,
    useAccount,
    useBalance,
    Web3Button,
} from "@web3modal/react"
import { Box, Text, Button } from "@chakra-ui/react"
// import Identicon from "./Identicon"
import { getDefaultProvider } from "ethers"

type Props = {
    handleOpenModal: any
}

export const web3ModalConfig = {
    projectId: "4e865ec89717ae5ebac37c5fb7a995a0",
    theme: "dark",
    accentColor: "default",
    ethereum: {
        appName: "Emofties",
        autoConnect: true,
        chains: [
            chains.localhost,
            chains.goerli,
            chains.mainnet,
            chains.polygon,
        ],
        providers: [
            getDefaultProvider(),
            providers.walletConnectProvider({
                projectId: "4e865ec89717ae5ebac37c5fb7a995a0",
            }),
            providers.alchemyProvider({
                apiKey: "https://eth-goerli.g.alchemy.com/v2/R-eWeP3NgwNItKOpwnL972eb6A7aGWyA",
            }),
        ],
    },
}

export function Web3ModalProfile({ handleOpenModal }: Props) {
    const { account } = useAccount()
    const { data, error, isLoading, refetch } = useBalance({
        addressOrName: account.address,
    })

    return (
        <div>
            <Web3Button />
            {account.isConnected && (
                <Box
                    display="flex"
                    alignItems="center"
                    background="gray.700"
                    borderRadius="xl"
                    py="0"
                >
                    <Box px="3">
                        <Text color="white" fontSize="md">
                            {isLoading
                                ? "Loading..."
                                : `${parseFloat(data?.formatted as any).toFixed(
                                      3
                                  )} ${data?.symbol}`}
                        </Text>
                    </Box>

                    <Button
                        onClick={handleOpenModal}
                        bg="gray.800"
                        border="1px solid transparent"
                        _hover={{
                            border: "1px",
                            borderStyle: "solid",
                            borderColor: "blue.400",
                            backgroundColor: "gray.700",
                        }}
                        borderRadius="xl"
                        m="1px"
                        px={3}
                        height="38px"
                    >
                        <Text
                            color="white"
                            fontSize="md"
                            fontWeight="medium"
                            mr="2"
                        >
                            {account.address &&
                                `${account.address.slice(
                                    0,
                                    6
                                )}...${account.address.slice(
                                    account.address.length - 4,
                                    account.address.length
                                )}`}
                        </Text>
                        {/* <Identicon /> */}
                    </Button>
                </Box>
            )}
        </div>
    )
}
