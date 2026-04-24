const Button = ({ buttonName, onClick, children, ...props }) => (
    <div onClick={onClick} {...props}>
        {buttonName}
        {children} 
    </div>
);
export default Button;