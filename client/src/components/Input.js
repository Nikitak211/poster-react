

const Input = ({type,callback, required, value,func, message,valid}) => {

    return (
        <input type={type} {...func(callback, {
            required: required,
            minLength: {
                value: value,
                message: message
            },
            validate: valid

        })}></input>
     );
}
 
export default Input;