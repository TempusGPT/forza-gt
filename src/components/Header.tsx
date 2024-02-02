type Props = {
    version: string;
    url: string;
};

export default ({ version, url }: Props) => {
    return (
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
    );
};
