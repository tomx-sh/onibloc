'use client'
import * as d3 from 'd3';
import { BlockData } from './Block';
import { useState, useCallback, useRef } from 'react';
import { useTransactionHovered } from './useTransactionHovered';


interface TransactionProps {
    leaf: d3.HierarchyRectangularNode<BlockData>;
}


export default function Transaction({ leaf }: TransactionProps) {
    const elementRef = useRef<SVGRectElement>(null);
    const { setHoveredElementRef } = useTransactionHovered();
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setHovered(true)
        setHoveredElementRef(elementRef)
    }, [elementRef, setHoveredElementRef]);

    const handleMouseLeave = useCallback(() => {
        setHovered(false)
        setHoveredElementRef({ current: null })
    }, [setHoveredElementRef]);

    const color = hovered ? 'var(--accent-4)' : 'var(--accent-1)';



    return (
        <rect
            ref={elementRef}
            x={leaf.x0}
            y={leaf.y0}
            width={leaf.x1 - leaf.x0}
            height={leaf.y1 - leaf.y0}
            fill={color}
            rx={0}
            ry={0}
            //style={{ cursor: 'pointer' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}

        />
    )
}