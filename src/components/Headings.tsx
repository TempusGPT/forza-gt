type Props = {
    title: string;
    subtitle: string;
};

export default ({ title, subtitle }: Props) => {
    return (
        <div class="headings">
            <h1>{title}</h1>
            <h1>{subtitle}</h1>
        </div>
    );
};
