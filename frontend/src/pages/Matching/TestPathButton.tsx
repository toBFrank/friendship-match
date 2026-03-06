import styles from "./Matching.module.css";

interface TestPathButtonProps {
    label: string;
    icon?: string;
    onClick?: () => void;
}

function TestPathButton({ label, icon, onClick }: TestPathButtonProps) {
    return (
        <button className={styles.testpath_bttn} onClick={onClick}>
            <img
                src={icon || "/src/assets/icons/placeholder_icon.png"}
                alt="Placeholder Icon"
            />
            <span>{label}</span>
        </button>
    );
}

export default TestPathButton;