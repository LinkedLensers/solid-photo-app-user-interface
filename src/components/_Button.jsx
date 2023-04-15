// reusable and recomposable simple button
// - docs: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
// - usage: https://reactgo.com/react-button/

const Button = (props) => {
  return <button
      className={props.style}
      onClick={props.click}
    >
      {props.name}
    </button>;
}

export default Button;
