import { gql, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import ErrorPage from "../../pages/ErrorPage"

import { Emofty } from "../../../../subgraph-goerli/generated/schema"
import EmoftyCard from "../emofties/EmoftyCard"

const EMOFTIES = gql`
    query {
        emofties {
            # id
            emoftyId
            sender
            coreEmotion
            receiver
            memo
            # timestamp
            # blockNumber
            # blockTimestamp
            # transactionHash
        }
    }
`

const Feed = () => {
    const [emoftiesCol, setEmoftiesCol] = useState<Emofty[]>([])
    const { loading, error, data } = useQuery(EMOFTIES)

    useEffect(() => {
        if (data) {
            const { emofties } = data
            setEmoftiesCol(emofties)
        }
    }, [data])
    return (
        <div>
            {loading && <span>Loading Emofties...</span>}
            {error && <span>{error?.message}</span>}
            {emoftiesCol && (
                <div className=" flex flex-col gap-10 items-center">
                    {emoftiesCol.map((emofty) => (
                        <EmoftyCard emofty={emofty} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Feed
