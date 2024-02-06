import { JSX } from "solid-js/jsx-runtime";

export type LayoutProps = {
    version: string;
    url: string;
    children?: JSX.Element;
};

export default (props: LayoutProps) => {
    return (
        <>
            <nav class="container-fluid">
                <ul />
                <ul>
                    <li>Version {props.version}</li>
                    <li>•</li>
                    <li>
                        <a href={props.url}>Source Code</a>
                    </li>
                </ul>
            </nav>
            {props.children}
        </>
    );
};
