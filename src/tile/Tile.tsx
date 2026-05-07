import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

function Tile(props: {
    title: string;
    headlines: Array<string>;
    src: string;
    logo?: string;
    href?: string;
}) {
    const [transformOrigin, setTransformOrigin] = useState(
        calcTransformOrigin(0, 0),
    );

    const [point, setPoint] = useState(() => {
        return {
            x: Math.floor(Math.random() * 50) - 25,
            y: Math.floor(Math.random() * 50) - 25,
        };
    }); // Point percentage relative to center

    const edgePoint = useMemo(() => {
        // Scale factor to reach the nearest edge
        // Whichever axis is "more extreme" determines which edge we choose
        const scale = 50 / Math.max(Math.abs(point.x), Math.abs(point.y));

        const edgeX = point.x * -scale;
        const edgeY = point.y * scale;

        // Convert from "center-relative" (-50 to 50) to percentage (0 to 100)
        return {
            x: edgeX + 50,
            y: edgeY + 50,
        };
    }, [point]);
    const lastUpdate = useRef(0);

    // Store edgePoint in state with a delayed update
    const [smoothEdge, setSmoothEdge] = useState(edgePoint);

    useEffect(() => {
        const now = performance.now();
        if (now - lastUpdate.current >= 175) {
            lastUpdate.current = now;
            setSmoothEdge(edgePoint);
        }
    }, [edgePoint]);

    // Jitter loop
    useEffect(() => {
        const now = performance.now();
        const lu = now - 9999;
        const loop = () => {
            if (now - lu >= 175) {
                setPoint((prev) => ({
                    x: prev.x + (Math.random() - 0.5) * 2 * 0.5,
                    y: prev.y + (Math.random() - 0.5) * 2 * 0.5,
                }));
            }
        };
        const raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    });

    function handleImgMouseMove(e: MouseEvent<HTMLAnchorElement>) {
        const target = e.currentTarget;

        const width = target.offsetWidth;
        const left = target.offsetLeft - document.documentElement.scrollLeft;
        const xRelativeToCentre = left + width / 2 - e.clientX;
        const x = (xRelativeToCentre / (width / 2)) * 25;

        const height = target.offsetHeight;
        const top = target.offsetTop - document.documentElement.scrollTop;
        const yRelativeToCentre = e.clientY - (top + height / 2);
        const y = (yRelativeToCentre / (height / 2)) * 25;

        setPoint({ x, y });

        setTransformOrigin(
            calcTransformOrigin(xRelativeToCentre, yRelativeToCentre),
        );
    }

    function calcTransformOrigin(x: number, y: number): string {
        if (y === 0 && x !== 0) {
            return x < 0 ? "origin-left" : "origin-right";
        } else if (x === 0 && y !== 0) {
            return y < 0 ? "origin-top" : "origin-bottom";
        } else if (x > 0) {
            return y < 0 ? "origin-top-right" : "origin-bottom-right";
        } else if (x < 0) {
            return y < 0 ? "origin-top-left" : "origin-bottom-left";
        }
        return "origin-center";
    }

    return (
        <>
            <div className="rounded-md gap-4 flex flex-col">
                <a
                    rel="noopener noreferer"
                    target="_blank"
                    href={props.href}
                    className="flex w-full h-fit rounded-md overflow-clip inset-shadow-sm"
                    style={{
                        background: `radial-gradient(circle at ${smoothEdge.x}% ${smoothEdge.y}%, #F2C4A0 -50%, transparent 100%)`,
                    }}
                    onMouseMove={handleImgMouseMove}
                >
                    <div className="h-10/12 m-auto">
                        <img
                            className={`${transformOrigin} h-full rounded-md duration-175`}
                            src={props.src}
                            style={{
                                transform: `rotateX(${point.y}deg) rotateY(${point.x}deg)`,
                                filter: `drop-shadow(${point.x}px ${-1 * point.y}px 10px #282828)`,
                            }}
                        ></img>
                    </div>
                </a>
                <div className="px-4 flex flex-col gap-2 h-fit mt-auto">
                    {props.headlines.length > 1 ? (
                        <ul className="flex flex-col gap-2">
                            {props.headlines.map((headline) => {
                                return (
                                    <li
                                        key={headline}
                                        className="leading-none border-l border-l-gray-400 pl-2"
                                    >
                                        {headline}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="leading-none border-l border-l-gray-400 pl-2">
                            {props.headlines[0]}
                        </p>
                    )}
                    <p className="flex gap-2 items-center font-bold">
                        {props.logo ? (
                            <img
                                className="h-5 rounded-sm"
                                src={props.logo}
                            ></img>
                        ) : (
                            <></>
                        )}
                        {props.title}
                    </p>
                </div>
            </div>
        </>
    );
}

export default Tile;
