import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";



const baseUrl = 'http://localhost:4000'
const socialLinks = [
    {
        name: 'GitHub',
        url: 'https://github.com/mohamedemara01018',
        icon: <FaGithub />
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/mohamed--emara/',
        icon: <FaLinkedin />
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com',
        icon: <FaTwitter />
    },
    {
        name: 'Email',
        url: 'marhjmal6@gmail.com',
        icon: <MdEmail />

    }
];


export { baseUrl, socialLinks }