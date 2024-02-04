import { JSX } from "solid-js/jsx-runtime";

type Props = {
    version: string;
    url: string;
    children?: JSX.Element;
};

export default ({ version, url, children }: Props) => {
    return (
        <>
            <nav class="container-fluid">
                <ul />
                <ul>
                    <li>Version {version}</li>
                    <li>•</li>
                    <li>
                        <a href={url}>Source Code</a>
                    </li>
                </ul>
            </nav>
            {children}
        </>
    );
};
