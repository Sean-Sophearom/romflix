import { Spinner } from "./icons";

const Button = (props) => {
  return <button {...props}>{props.loading ? <Spinner /> : props.children}</button>;
};

export default Button;
