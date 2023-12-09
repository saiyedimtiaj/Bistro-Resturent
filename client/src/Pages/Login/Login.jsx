import { Link, useLocation, useNavigate } from "react-router-dom";
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext,   } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import SocileRegister from "../../Components/SocileRegister/SocileRegister";

const Login = () => {
  // const [disabled,setDisabled] = useState(true);
  const {signIn} = useContext(AuthContext)
  
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // useEffect(()=>{
  //   loadCaptchaEnginge(6); 
  // },[])

    const handleLogin = (event) => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password);
      signIn(email, password)
          .then(result => {
              const user = result.user;
              console.log(user);
              Swal.fire({
                  title: 'User Login Successful.',
                  showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                  }
              });
              navigate(from, { replace: true });
          })
    }

    // const handleValidateCaptcha = (e) => {
    //   const user_captcha_value = e.target.value;
    //   if(validateCaptcha(user_captcha_value)==true){
    //     setDisabled(false)
    //     alert ('validate sucessfully')
    //   }else{
    //     alert('not validate')
    //   }
    // }

    return (
        <div className="container mx-auto px-5 mt-4 flex items-center justify-center lg:flex-row flex-col gap-8">
          <div className="">
            <img
              className="lg:h-[400px]"
              src="../assets/others/authentication2.png"
              alt=""
            />
          </div>
          <div className="flex-1 max-w-sm bg-[#f0eded] px-7 py-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-5">Log In</h1>
            <form onSubmit={handleLogin}>
              <label className="font-bold " htmlFor="email">
                Your Email
              </label>{" "}
              <br />
              <input
                type="email"
                required
                name="email"
                className="py-2 px-3 mb-3 mt-1 w-full rounded-sm"
                placeholder="Enter email here..."
              />
              <label className="font-bold " htmlFor="email">
                Password
              </label>{" "}
              <br />
              <input
                type="password"
                name="password"
                required
                className="py-2 px-3 w-full rounded-sm"
                placeholder="Enter Password here..."
              />
              {/* <div className="mt-3"><LoadCanvasTemplate /></div>
              <input
                type="text"
                name="captcha"
                onBlur={handleValidateCaptcha}
                required
                className="py-2 px-3 mt-1 w-full rounded-sm"
                placeholder="type the text aboue"
              /> */}
              <input
                type="submit"
                disabled={false}
                value="Sign In"
                className="btn btn-secondary block w-full"
              />
            </form>
            <p className="my-2 text-center font-medium">or</p>
            <SocileRegister/>
            <p className="font-bold mt-1">
              Dont have any Account?
              <Link to="/signup" className="text-red-600">
                Register
              </Link>
            </p>
          </div>
        </div>
    );
};

export default Login;