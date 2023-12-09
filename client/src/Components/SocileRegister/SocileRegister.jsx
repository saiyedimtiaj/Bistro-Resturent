import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { useLocation, useNavigate } from "react-router-dom";

const SocileRegister = () => {
  const { googleLogin } = useAuth();
  const axios = useAxios();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogle = () => {
    googleLogin()
      .then((res) => {
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
        };
        axios.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-2 py-3 rounded border-black border font-medium cursor-pointer text-lg"
      >
        <p className="text-2xl">
          <FcGoogle />
        </p>
        <p>Sign in with Google</p>
      </button>
    </div>
  );
};

export default SocileRegister;
