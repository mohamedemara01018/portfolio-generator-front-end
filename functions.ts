
import { baseUrl } from "./constant";
import { FormData, FormDataLogin, FormErrors, FormErrorsLogin } from "./types";

const validateFormRegister = (formData: FormData) => {
    const newError: FormErrors = {};

    //firstName
    if (!formData.firstName) {
        newError.firstName = 'you must provide first name'
    } else if (formData.firstName.length <= 2) {
        newError.firstName = 'first name must be greate than 3 character'
    }

    //lastName
    if (!formData.lastName) {
        newError.lastName = 'you must provide last name'
    } else if (formData.lastName.length <= 2) {
        newError.lastName = 'last name must be greate than 3 character'
    }

    //email
    if (!formData.email) {
        newError.email = 'you must provide email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newError.email = 'you must provide a valid email address';
    }

    //password
    if (!formData.password) {
        newError.password = 'you must provide password'
    } else if (formData.password.length < 8) {
        newError.password = 'password must be greate than 8 character'
    }

    //confirmPassword
    if (!formData.confirmPassword) {
        newError.confirmPassword = 'you must provide password'
    } else if (formData.confirmPassword !== formData.password) {
        newError.confirmPassword = "confirmPassword & password are don't match["
    }

    return newError
}

const validateFormLogin = (formData: FormDataLogin) => {
    const newError: FormErrorsLogin = {

    }

    if (!formData.email) {
        newError.email = 'you must provide email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newError.email = 'you must provide a valid email address';
    }

    if (!formData.password) {
        newError.password = 'you must proive password'
    }

    return newError
}


export { validateFormRegister, validateFormLogin }