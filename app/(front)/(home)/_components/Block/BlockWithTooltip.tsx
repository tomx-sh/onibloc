'use client'
import Block, {BlockProps} from "./Block"
import { TransactionHoveredProvider, useTransactionHovered } from "./useTransactionHovered"
import { Box, HoverCard } from "@radix-ui/themes"
import { useState, useEffect } from "react"


function BlockWithTooltip({ data }: BlockProps) {
    const { hoveredElementRef } = useTransactionHovered();
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateTooltipPosition = () => {
            if (hoveredElementRef.current) {
                const rect = hoveredElementRef.current.getBoundingClientRect();
                setTooltipPosition({
                    x: rect.left,
                    y: rect.top,
                });
            }
        };

        // Initial position set
        updateTooltipPosition();

        // Update on scroll and resize for responsive positioning
        window.addEventListener('scroll', updateTooltipPosition);
        window.addEventListener('resize', updateTooltipPosition);
        return () => {
            window.removeEventListener('scroll', updateTooltipPosition);
            window.removeEventListener('resize', updateTooltipPosition);
        };
    }, [hoveredElementRef]);
    

    return (
        <Box>
            
            {/*<Tooltip content={'Hello'} open style={{display: hoveredElementRef.current ? 'block' : 'none'}}>*/}
            <HoverCard.Root open={hoveredElementRef.current ? true : false}>
                <HoverCard.Trigger>
                    
                <Box 
                    display={hoveredElementRef.current ? 'block' : 'none'}
                    style={{
                        position:'fixed',
                        top: tooltipPosition.y,
                        left: tooltipPosition.x,
                        width: hoveredElementRef.current?.getBoundingClientRect().width,
                        height: hoveredElementRef.current?.getBoundingClientRect().height,
                        pointerEvents: 'none',
                    }}
                />
                </HoverCard.Trigger>

                <HoverCard.Content side="top" align="center" style={{ display: hoveredElementRef.current ? 'block' : 'none' }}>
                    Hello
                </HoverCard.Content>
            </HoverCard.Root>


            <Block data={data}/>
        </Box>

    )
}


function BlockWithTooltipWithProvider({ data }: BlockProps) {
    return (
        <TransactionHoveredProvider>
            <BlockWithTooltip data={data}/>
        </TransactionHoveredProvider>
    )
}

export default BlockWithTooltipWithProvider