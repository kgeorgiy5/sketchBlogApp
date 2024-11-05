import styles from "../styles/Button.module.css"

const getButtonVariant = (buttonType: string) => {
  switch (buttonType) {
    case "NAVBAR":
      return styles["navbar-button"];
    case "NAVBAR_HIGHLIGHTED":
      return `${styles["navbar-button"]} ${styles["navbar-button--highlighted"]}`;
    default:
      return styles["default-button"];
  }
}

export default getButtonVariant;
