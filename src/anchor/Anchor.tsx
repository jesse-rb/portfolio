function Anchor(props: {
    href: string;
    target: string | undefined;
    rel: string | undefined;
    children: React.ReactNode;
}) {
    return (
        <>
            <span className="anchor-component">
                <a href={props.href} target={props.target} rel={props.rel}>
                    {props.children}
                </a>
                <span className="underline pointer-events-none"></span>
            </span>
        </>
    );
}

export default Anchor;
