import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;

        console.log("Google User:", loggedUser);

        const userInfo = {
          uid: loggedUser.uid,
          name: loggedUser.displayName,
          email: loggedUser.email,
          image: loggedUser.photoURL,
          role: "user",
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          console.log("User saved:", res.data);
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
      });
  };

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
