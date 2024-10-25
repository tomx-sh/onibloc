'use client'
import * as d3 from "d3";
import Transaction from "./Transaction";

interface Node {
    topText?: string;
    centerText?: string;
    bottomText?: string;
}

interface LeafNode extends Node {
    value: number;
}

interface ParentNode extends Node {
    children: (LeafNode | ParentNode)[];
}

export type BlockData = ParentNode | LeafNode;

const mockArray: LeafNode[] = [
    { topText: "A", centerText: "B", bottomText: "C", value: 10 },
    { topText: "D", centerText: "E", bottomText: "F", value: 20 },
    { topText: "G", centerText: "H", bottomText: "I", value: 30 },
    { topText: "J", centerText: "K", bottomText: "L", value: 40 },
    { topText: "M", centerText: "N", bottomText: "O", value: 50 },
    { topText: "P", centerText: "Q", bottomText: "R", value: 60 },
    { topText: "S", centerText: "T", bottomText: "U", value: 70 },
    { topText: "V", centerText: "W", bottomText: "X", value: 80 },
    { topText: "Y", centerText: "Z", bottomText: "!", value: 90 },
    { topText: "1", centerText: "2", bottomText: "3", value: 100 },
    { topText: "4", centerText: "5", bottomText: "6", value: 110 },
    { topText: "7", centerText: "8", bottomText: "9", value: 120 },
    { topText: "0", centerText: "!", bottomText: "!", value: 130 }
]

export interface BlockProps {
    data?: LeafNode[];
}

export default function Block({ data=mockArray }: BlockProps) {

    const _data: ParentNode = {
        topText: "Root",
        centerText: "Node",
        bottomText: "Tree",
        children: data,
    };

    const children = d3.hierarchy<BlockData>(_data).sum(d => 'value' in d ? d.value : 0).sort((a, b) => {
        if ('value' in b && 'value' in a && b.value !== undefined && a.value !== undefined) {
            return b.value - a.value;
        }
        return 0;
    });
    const root = d3.treemap<BlockData>().size([100, 100]).padding(0.2).tile(d3.treemapSquarify.ratio(1))(children)

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="var(--accent-8)">

            <rect x="0" y="0" width="100" height="100" rx="0" ry="0"></rect>

            {root.leaves().map((leaf, i) => (
                /*<rect
                    key={i}
                    x={leaf.x0}
                    y={leaf.y0}
                    width={leaf.x1 - leaf.x0}
                    height={leaf.y1 - leaf.y0}
                    fill="var(--accent-1)"
                    rx={0}
                    ry={0}
                    style={{cursor: 'pointer'}}
                />*/
                <Transaction leaf={leaf} key={i}/>
            ))}

            {/*root.leaves().map((leaf, i) => (
                <TransactionInfo
                    key={i}
                    transform={`translate(${leaf.x0}, ${leaf.y0})`}
                    width={leaf.x1 - leaf.x0}
                    height={leaf.y1 - leaf.y0}
                    topText={leaf.data.topText}
                    centerText={leaf.data.centerText}
                    bottomText={leaf.data.bottomText}
                />
            ))*/}

        </svg>
    )
}

/** 
interface TransactionInfoProps extends React.SVGProps<SVGGElement> {
    topText?: string;
    centerText?: string;
    bottomText?: string;
}

function TransactionInfo({ topText, centerText, bottomText, ...props }: TransactionInfoProps) {
    const textSizeSmall = 2;
    const textSizeLarge = 3;
    const margin = 0.8;
    const contentWidth  = props.width  ? parseFloat(props.width.toString())  - 2*margin : 10
    const contentHeight = props.height ? parseFloat(props.height.toString()) - 2*margin : 10
    const clipPathId = `textClip-${topText}` // Not ideal, but should be unique enough for this example

    // Estimate character width based on font and text size (adjust as needed)
    const estimatedCharWidthSmall = textSizeSmall * 0.6;
    const estimatedCharWidthLarge = textSizeLarge * 0.7;
    const maxCharsSmall = Math.floor(contentWidth / estimatedCharWidthSmall);
    const maxCharsLarge = Math.floor(contentWidth / estimatedCharWidthLarge);

    // Truncate text if it's too long
    if (topText && topText.length > maxCharsSmall) topText = topText.slice(0, maxCharsSmall - 1) + "…";
    if (centerText && centerText.length > maxCharsLarge) centerText = centerText.slice(0, maxCharsLarge - 1) + "…";
    if (bottomText && bottomText.length > maxCharsSmall) bottomText = bottomText.slice(0, maxCharsSmall - 1) + "…";

    // If height is too small, only show the top text
    if (contentHeight < textSizeLarge + 2*textSizeSmall) centerText = bottomText = "";

    // If height really is too small, don't show anything
    if (contentHeight < textSizeSmall) topText = "";

    return (
        <g {...props}>
            <defs>
                <clipPath id={clipPathId}>
                    <rect x="0" y="0" width={contentWidth} height={contentHeight} />
                </clipPath>
            </defs>

            <g transform={`translate(${margin}, ${margin})`} width={contentWidth} height={contentHeight} clipPath={`url(#${clipPathId})`}>
                <text x="0" y="0" fontSize={textSizeSmall} fill="var(--accent-11)" dominantBaseline={"hanging"} fontFamily="monospace">{topText}</text>
                <text x={contentWidth/2} y={contentHeight/2} fontSize={textSizeLarge} fontWeight={'bold'}  fill="var(--accent-12)" dominantBaseline={"middle"} textAnchor={"middle"}>{centerText}</text>
                <text x={contentWidth} y={contentHeight} fontSize={textSizeSmall} fill="var(--accent-11)" dominantBaseline={"baseline"} textAnchor={"end"} fontFamily="monospace">{bottomText}</text>
            </g>
        </g>
    )
}

*/