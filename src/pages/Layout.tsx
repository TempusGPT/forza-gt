import { JSX } from "solid-js/jsx-runtime";

export type LayoutProps = {
    url: string;
    children?: JSX.Element;
};

export default (props: LayoutProps) => {
    return (
        <>
            <nav class="container-fluid">
                <ul />
                <ul>
                    <li>
                        <a href={props.url}>Source Code</a>
                    </li>
                </ul>
            </nav>
            {props.children}
        </>
    );
};
