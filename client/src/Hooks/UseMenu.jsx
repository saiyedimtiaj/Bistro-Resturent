import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";


const UseMenu = () => {
    const axios = useAxios()

    const { data:menu=[],isPending:loading,refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () =>{
            const res = await axios.get('http://localhost:5000/menus')
            return res.data
        }
      })
    return [menu,loading,refetch]
};

export default UseMenu;