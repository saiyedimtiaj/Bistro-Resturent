/* eslint-disable react/prop-types */


const Cover = ({image,title}) => {
    return (
        <div className="hero h-[600px] mb-14" style={{backgroundImage:`url('${image}')`}}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md px-5">
                    <h1 className="text-5xl font-bold mb-5 uppercase">{title}</h1>
                    <p className=" mb-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil enim nisi consequatur quod numquam veritatis voluptatibus ducimus! Sint, corporis voluptates.</p>

                </div>
            </div>
        </div>
    );
};

export default Cover;