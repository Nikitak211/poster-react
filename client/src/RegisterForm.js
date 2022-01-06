import {useState} from 'react'

const RegisterForm = () => {

    const [usernameValue, setUsernameValue]= useState("");
    const [passwordValue,setPasswordValue]= useState("");
    const [validation_passwordValue,setValidation_passwordValue]= useState("");
    const [emailValue,setEmailValue]= useState("");
    const [validation_emailValue,setValidation_emailValue]= useState("");

    const [usernameError, setUsernameError]= useState("label");
    const [passwordValueError,setPasswordValueError]= useState("label");
    const [validation_passwordValueError,setValidation_passwordValueError]= useState("label");
    const [emailValueError,setEmailValueError]= useState("label");
    const [validation_emailValueError,setValidation_emailValueError]= useState("label");

    const [usernameSmallValue, setusernameSmallValue]= useState("");
    const [passwordSmallValue,setPasswordSmallValue]= useState("");
    const [validation_passwordSmallValue,setValidation_passwordSmallValue]= useState("");
    const [emailSmallValue,setEmailSmallValue]= useState("");
    const [validation_emailSmallValue,setValidation_emailSmallValue]= useState("");

    const [usernameSmallError, setUsernameSmallError]= useState("small");
    const [passwordValueSmallError,setPasswordValueSmallError]= useState("small");
    const [validation_passwordSmallError,setValidation_passwordSmallError]= useState("small");
    const [emailSmallError,setEmailSmallError]= useState("small");
    const [validation_emailSmallError,setValidation_emailSmallError]= useState("small");

    const onSubmit = async (e) => {
        e.preventDefault();
        const usernameValidation = (value, input, input2,smallInput) => {
            if (value === "") {
                errorOn(input,input2,smallInput ,"username cannot be blank")
                return false;
            } else if (value.includes('@')) {
                errorOn(input,input2,smallInput ,"username cannot be email")
                return false;
            }
                successOn(input,input2)
                return true;
        }
        if (!usernameValidation(usernameValue,setUsernameError,setUsernameSmallError,setusernameSmallValue)) return;
    
        const emailValidation = (value, input, input2,smallInput) => {
            if (value === "") {
                input('label error')
                errorOn(input, input2, smallInput, "email cannot be blank")
                return false;
            } else if (!isEmail(value)) {
                input('label error')
                errorOn(input, input2, smallInput,  "need to enter email address")
                return false;
            } else {
                input('label success')
                successOn(input, input2)
                return true;
            }
        }
        if (!emailValidation(emailValue,setEmailValueError,setEmailSmallError,setEmailSmallValue)) return;
        if (!emailValidation(validation_emailValue,setValidation_emailValueError,setValidation_emailSmallError ,setValidation_emailSmallValue)) return;
    
        const emailMatch = (value, value2 , input, input2,smallInput) => {
            if (value !== value2 || value2 === "") {
                errorOn(input, input2, smallInput, "email is not matching...")
                return false;
            } else {
                successOn(input, input2)
                return true;
            }
        }
        if (!emailMatch(emailValue, validation_emailValue,setEmailValueError,setEmailSmallError,setEmailSmallValue));
        if (!emailMatch(emailValue, validation_emailValue,setValidation_emailValueError, setValidation_emailSmallError ,setValidation_emailSmallValue)) return;
        
        const passwordValidation = (value, input, input2,smallInput) => {
            if (value === "") {
                input('label error')
                errorOn(input, input2, smallInput, "password cannot be blank")
                return false;
            } else if (value.length < 8) {
                input('label error')
                errorOn(input, input2, smallInput, "password must contain minimum of 8 charecters.")
                return false;
            }
                input('label success')
                successOn(input, input2)
                return true;
        }
        if (!passwordValidation(passwordValue,setPasswordValueError,setPasswordValueSmallError,setPasswordSmallValue)) return;
        if (!passwordValidation(validation_passwordValue,setValidation_passwordValueError,setValidation_passwordSmallError,setValidation_passwordSmallValue)) return;
    
        const passwordMatch = (value, value2, input, input2,smallInput) => {
            if (value !== value2 || value === "" || value2 === "") {
                errorOn(input, input2, smallInput, "password is not matching...")
                input('label error')
                return false;
            } else {
                input('label success')
                return true;
            }
        }
        if (!passwordMatch(validation_passwordValue, passwordValue,setPasswordValueError,setPasswordValueSmallError,setPasswordSmallValue)) ;
        if (!passwordMatch(validation_passwordValue, passwordValue,setValidation_passwordValueError,setValidation_passwordSmallError,setValidation_passwordSmallValue)) return;
    
        // console.log(usernameValue,passwordValue,emailValue) 

        await fetch(`/api/auth/register/?author=${usernameValue}&password=${passwordValue}&email=${emailValue}&date=${new Date()}`)
        .then(response => {
            if (!response.ok) {
                throw Error('could not fetch the data')
            }
            return response.json()
        })
        .then(data => {
            if (data.success) {
                window.location = "/";
            }
            if (data.error) {
                errorOn(setEmailValueError, setEmailSmallError ,setEmailSmallValue,data.message)
                errorOn(setValidation_emailValueError,setValidation_emailSmallError ,setValidation_emailSmallValue ,data.message)
            }
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            }
            console.log(err)
        })
    }
    function errorOn(input,input2,smallInput, message) {
        input('label error');
        input2('small error');
        smallInput(message);
    }
    function successOn(input,input2) {
        input('label success');
        input2('small success');
    }
    function isEmail(email) {
        return /^(([^<>()\\,;:\s@"]+(\.[^<>()\\,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
    
    return ( 
        <form action="" >
            <div>
                <label className={usernameError}>Username</label>
                <small className={usernameSmallError}>{usernameSmallValue}</small>
                <input type="username" name="username" onChange={e => setUsernameValue(e.target.value)}></input>
            </div>
            <div>
                <label className={emailValueError}>Email</label>
                <small className={emailSmallError}>{emailSmallValue}</small>
                <input type="email" name="email" onChange={e => setEmailValue(e.target.value)}></input>
            </div>
            <div>
                <label className={validation_emailValueError}>Email Verification</label>
                <small className={validation_emailSmallError}>{validation_emailSmallValue}</small>
                <input type="email" name="email" onChange={e => setValidation_emailValue(e.target.value)}></input>
            </div>
            <div>
                <label className={passwordValueError}>Password</label>
                <small className={passwordValueSmallError}>{passwordSmallValue}</small>
                <input type="Password" name="Password" onChange={e => setPasswordValue(e.target.value)}></input>
            </div>
            <div>
                <label className={validation_passwordValueError}>Password Verification</label>
                <small className={validation_passwordSmallError}>{validation_passwordSmallValue}</small>
                <input type="Password" name="Password" onChange={e => setValidation_passwordValue(e.target.value)}></input>
            </div>
            <button onClick={onSubmit}>Sign Up</button>
        </form>
     );
     
}
 
export default RegisterForm;