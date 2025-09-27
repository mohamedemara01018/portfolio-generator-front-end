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

interface verificationState {
    loading: boolean | null,
    error: string | null,
    message: string | null
}

interface verificationData {
    email: string,
    code: string
}
interface reSendCodeState {
    loading: boolean | null,
    error: string | null,
    message: string | null
}



// templates 

interface HeroData {
    name: string,
    title: string,
    bio: string,
    avatar: string,
    contact: {
        email: string,
        phone: string,
        linkedin: string,
        github: string,
        website: string,
    }
}

interface AboutData {
    bio: string
    skills: string[],
    experience: string
    projects: string
    focus: string
}

interface ProjectsData {
    title: string,
    description: string,
    image: string,
    technologies: string[],
    liveUrl: string,
    githubUrl: string,
}

interface SkillCategories {
    title: string
    skills: string[]
    level: number
}

interface Contact {
    email: string,
    phone: string,
    linkedin: string,
    github: string,
    website: string,
}



interface initialStateTemplate {
    image: string,
    type: string,
    description: string,
    heroData: HeroData,
    aboutData: AboutData
    projectsData: ProjectsData[],
    skillCategories: SkillCategories[]
    contact: Contact
}
export type {
    Contact,
    AboutData,
    SkillCategories,
    ProjectsData,
    initialStateTemplate,
    HeroData,
    reSendCodeState,
    verificationData,
    verificationState,
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