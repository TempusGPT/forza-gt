type Props = {
    label: string;
};

export default ({ label }: Props) => {
    return (
        <label>
            {label}
            <input name={label} placeholder="0.48-6.00" inputmode="numeric" />
        </label>
    );
};
