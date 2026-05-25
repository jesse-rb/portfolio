function Anchor(props: {
    href: string;
    target: string | undefined;
    rel: string | undefined;
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="anchor-component">
                <a href={props.href} target={props.target} rel={props.rel}>
                    {props.children}
                </a>
                <div className="underline pointer-events-none"></div>
            </div>
        </>
    );
}

export default Anchor;
