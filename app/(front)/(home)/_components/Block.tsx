import * as d3 from "d3";
import { parse } from "path";

interface LeafNode {
    name: string;
    value: number;
}

interface ParentNode {
    name: string;
    children: LeafNode[];
}

type Data = ParentNode | LeafNode;

const dataArray = [
    { name: "A", value: 10 },
    { name: "B", value: 20 },
    { name: "C", value: 30 },
    { name: "D", value: 40 },
    { name: "E", value: 50 },
    { name: "F", value: 60 },
    { name: "G", value: 70 },
    { name: "H", value: 80 },
    { name: "I", value: 90 },
    { name: "J", value: 100 },
    { name: "K", value: 110 },
    { name: "L", value: 120 },
    { name: "M", value: 130 },
    { name: "N", value: 140 },
    { name: "O", value: 150 },
    { name: "P", value: 160 },
    { name: "Q", value: 170 },
    { name: "R", value: 180 },
    { name: "S", value: 190 },
    { name: "T", value: 200 },
    { name: "U", value: 210 },
    { name: "V", value: 220 },
    { name: "W", value: 230 },
    { name: "X", value: 240 },
    { name: "Y", value: 250 },
    { name: "Z", value: 260 },
]

const data: ParentNode = {
    name: "root",
    children: dataArray,
};


export default function Block() {

    const children = d3.hierarchy<Data>(data).sum(d => 'value' in d ? d.value : 0)
    const root = d3.treemap<Data>().size([100, 100]).padding(0.5).tile(d3.treemapSquarify.ratio(1))(children)

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="var(--accent-4)">

            <rect x="0" y="0" width="100" height="100" rx="1" ry="1"></rect>

            {root.leaves().map((leaf, i) => (
                <rect
                    key={i}
                    x={leaf.x0}
                    y={leaf.y0}
                    width={leaf.x1 - leaf.x0}
                    height={leaf.y1 - leaf.y0}
                    fill="var(--accent-1)"
                    rx={0.5}
                    ry={0.5}
                />
            ))}

            {root.leaves().map((leaf, i) => (
                <TransactionInfo
                    key={i}
                    transform={`translate(${leaf.x0}, ${leaf.y0})`}
                    width={leaf.x1 - leaf.x0}
                    height={leaf.y1 - leaf.y0}
                    hash={leaf.data.name}
                />
            ))}

        </svg>
    )
}


interface TransactionInfoProps extends React.SVGProps<SVGGElement> {
    hash?: string;
    fee?: number;
    size?: number;
}

function TransactionInfo({ hash, fee, size, ...props }: TransactionInfoProps) {
    const textSize = 2;
    const margin = 0.5;
    const contentWidth = props.width ? parseFloat(props.width.toString()) - 2*margin : 10
    const contentHeight = props.height ? parseFloat(props.height.toString()) - 2*margin : 10
    const clipPathId = `textClip-${hash}`;

    return (
        <g {...props}>
            {/* Define a clipPath with the desired width and height */}
            <defs>
                <clipPath id={clipPathId}>
                    <rect x="0" y="0" width={contentWidth} height={contentHeight} />
                </clipPath>
            </defs>

            <g transform={`translate(${margin}, ${margin})`} width={contentWidth} height={contentHeight} clipPath={`url(#${clipPathId})`}>
                <text x="0" y="0" fontSize={textSize} fill="var(--accent-9)" dominantBaseline={"hanging"}>{"azertyuiop"+hash}</text>
            </g>
        </g>
    )
}