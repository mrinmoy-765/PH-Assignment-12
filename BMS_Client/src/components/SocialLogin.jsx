import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate('/');
            })
        })
    }

    return (
        <div className="">
            <div className="border-t-2 mt-2 border-[#DBD8E3]"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn mt-2 w-full">
                    <FaGoogle className=""></FaGoogle>
                   Continue With Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;