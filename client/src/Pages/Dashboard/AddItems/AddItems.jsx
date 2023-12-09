import { useForm } from "react-hook-form";
import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import useAxios from "../../../Hooks/useAxios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
const Image_Hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${Image_Hosting_key}`

const AddItems = () => {
  const { register, handleSubmit,reset } = useForm();
    const axios = useAxios();
    const axiosSecure = useAxiosSecure()

  const onSubmit = async (data) => {
    console.log(data)
    const imageFile = {image:data.image[0]}
    const res = await axios.post(image_hosting_api,imageFile,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
    console.log(res.data);
    if(res.data.success){
        const menuItem = {
            name:data.name,
            category:data.category,
            price:parseFloat(data.price),
            recipe:data.recipe,
            image:res.data.data.display_url
        }
        const menuRes = await axiosSecure.post('/menus',menuItem)
        console.log(menuRes.data);
        if(menuRes.data.insertedId){
            reset()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
              
        }
    }
  };
  return (
    <div className="mt-4">
      <SectionHeading
        heading={"ADD AN ITEM"}
        subHeading="What's new?"
      ></SectionHeading>
      <div className="bg-[#F3F3F3] max-w-3xl ml-14 px-7 py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className="font-bold text-sm">
            Recipe name
          </label>
          <br />
          <input
            className="border-2 border-black w-full px-3 py-2"
            placeholder="Recipe name"
            {...register("name")}
          />
          <div className="flex gap-3">
            <div className="flex-1">
            <label htmlFor="name" className="font-bold text-sm">
            Recipe name
          </label>
            <select defaultValue='default' {...register("category")} className="select select-bordered w-full">
              <option disabled value='default'>
                Select A Category
              </option>
              <option value='salad'>salad</option>
              <option value='pizza'>pizza</option>
              <option value='soupe'>soupe</option>
              <option value='desserts'>desserts</option>
              <option value='drinks'>drinks</option>
            </select>
            </div>
            <div className="flex-1">
            <label htmlFor="price" className="font-bold text-sm">
            Recipe price
          </label>
          <br />
          <input
            className="border-2 border-black w-full px-3 py-2"
            placeholder="Recipe Price"
            {...register("price")}
          />
            </div>
          </div>
          <div>
          <label htmlFor="details" className="font-bold text-sm">
            Recipe Details
          </label>
          <br />
          <textarea  rows="8" {...register("recipe")} className="border-2 border-black w-full px-3 py-2"></textarea>
          </div>
          <div>
          <input rows="8" {...register("image")} type="file" className="file-input w-full max-w-xs" />
          </div>
          <input className="bg-yellow-600 text-white mt-3 px-5 py-2 font-medium" type="submit" value='Add Item' />
        </form>
      </div>
    </div>
  );
};

export default AddItems;
