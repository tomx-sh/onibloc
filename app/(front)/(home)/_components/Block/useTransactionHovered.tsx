'use client'
import { useContext, createContext, useState } from "react"

type TransactionHoveredContextType = {
    hoveredTxId: string | undefined;
    setHoveredTxId: (txId: string | undefined) => void;
    hoveredElementRef: React.RefObject<SVGRectElement>
    setHoveredElementRef: (ref: React.RefObject<SVGRectElement>) => void;
}

const TransactionHoveredContext = createContext<TransactionHoveredContextType | undefined>(undefined)


const TransactionHoveredProvider = ({ children }: { children: React.ReactNode }) => {
    const [hoveredTxId, setHoveredTxId] = useState<string | undefined>(undefined)
    const [hoveredElementRef, setHoveredElementRef] = useState<React.RefObject<SVGRectElement>>({ current: null })


    return (
        <TransactionHoveredContext.Provider value={{ hoveredTxId, setHoveredTxId, hoveredElementRef, setHoveredElementRef }}>
            {children}
        </TransactionHoveredContext.Provider>
    )
}


const useTransactionHovered = () => {
    const context = useContext(TransactionHoveredContext)
    if (!context) {
        throw new Error('useTransactionHovered must be used within a TransactionHoveredProvider')
    }
    return context
}

export { TransactionHoveredProvider, useTransactionHovered }