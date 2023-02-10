import { useEffect, useState } from "react"
import EmoftyCard from "../emofties/EmoftyCard"
import {
    parseEmoftyTx,
    queryEmoftyTransactions,
} from "../../services/ArweaveEmofties"

const ArweaveFeed = () => {
    const [emoftiesCol, setEmoftiesCol] = useState<any[]>([])

    useEffect(() => {
        const queryArweave = async () => {
            const txs = await queryEmoftyTransactions()
            const emofties = txs.map((tx: any) => parseEmoftyTx(tx.node))
            setEmoftiesCol(emofties)
        }
        queryArweave()
    }, [])
    return (
        <div>
            {emoftiesCol && (
                <div className="flex flex-col gap-10 items-center">
                    {emoftiesCol.map((emofty) => (
                        <EmoftyCard emofty={emofty} isArweave={true} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ArweaveFeed
