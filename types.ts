interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    image?: string
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

interface FormDataLogin {
    email: string;
    password: string;
}

interface FormErrorsLogin {
    email?: string | null;
    password?: string | null;
}

interface initialStateLogin {
    loading: boolean | null,
    error: string | null,
    token: string | null
}

interface initialStateRegister {
    loading: boolean | null,
    error: any | null,
    user: any | null
}

interface AuthState {
    loading: boolean | null;
    error: string | null;
    isAuthenticated: boolean;
    user: any | null;
    logIn: boolean;
}
interface logoutState {
    message: string | null
    loading: boolean | null,
    error: string | null,
}

interface userProfile {
    image: string
}

export type {
    FormData,
    FormErrors,
    FormDataLogin,
    FormErrorsLogin,
    initialStateLogin,
    initialStateRegister,
    AuthState,
    logoutState,
    userProfile
}