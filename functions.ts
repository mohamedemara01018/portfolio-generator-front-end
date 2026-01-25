
import { baseUrl } from "./constant";
import { FormData, FormDataLogin, FormErrors, FormErrorsLogin, initialStateTemplate } from "./types";

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


async function authUser(cookieHeader: string) {
    let res;

    try {
        const response = await fetch(`${baseUrl}/users/check`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookieHeader, // ✅ نمرر الكوكيز
            },
            cache: "no-store", // ✅ عشان يتفetch كل مرة
        });
        res = await response.json();

    } catch (error) {
        console.log("fetch error", error);
        res = { logIn: false };
    }
    return res
}



async function getTemplates() {
    try {
        const res = await fetch(`${baseUrl}/templates`);
        if (!res.ok) {
            throw new Error('failed to fetch all templates')
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(`erorr ${error}`);
    }
}


async function getTemplatesById(id: string) {
    // console.log(id);
    try {
        const res = await fetch(`${baseUrl}/templates/${id}`);
        if (!res.ok) {
            throw new Error('failed to fetch template')
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(`erorr ${error}`);
    }
}



async function updataUserPortfolio(cookieHeader: string, email: string, portfolio: initialStateTemplate) {
    try {
        const res = await fetch(`${baseUrl}/users`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                cookie: cookieHeader,
            },
            cache: 'no-store',
            body: JSON.stringify({
                email: email,
                portfolio: portfolio
            })
        });
        if (!res.ok) {
            throw new Error('faile to fetch ')
        }
        return res.json();
    } catch (error) {
        throw new Error('error when fetch')
    }
}

export {
    updataUserPortfolio,
    validateFormRegister,
    validateFormLogin,
    authUser,
    getTemplates,
    getTemplatesById
}