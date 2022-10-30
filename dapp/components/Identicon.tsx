// Identicon.tsx
import Jazzicon from "@metamask/jazzicon"
import { useEffect, useRef } from "react"
import styled from "@emotion/styled"
import { useAccount } from "@web3modal/react"

const StyledIdenticon = styled.div`
    height: 1rem;
    width: 1rem;
    border-radius: 1.125rem;
    background-color: black;
`

export default function Identicon() {
    const ref = useRef<HTMLDivElement>()
    const { account } = useAccount()

    useEffect(() => {
        if (account && ref.current) {
            ref.current.innerHTML = ""
            ref.current.appendChild(
                Jazzicon(16, parseInt(account.address.slice(2, 10), 16))
            )
        }
    }, [account])
    return <StyledIdenticon ref={ref as any} />
}
