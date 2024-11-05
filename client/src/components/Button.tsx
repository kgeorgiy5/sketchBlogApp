import IButtonProps from "../types/IButtonProps";
import getButtonVariant from "../utils/getButtonVariant";

const Button = ({ children, onClick, variant }: IButtonProps) => {

  const classes: string = getButtonVariant(variant);

  const buttonClickHandler = () => {
    onClick();
  }

  return (
    <button className={classes} onClick={buttonClickHandler} >
      {children}
    </button >
  )
};

export default Button;
