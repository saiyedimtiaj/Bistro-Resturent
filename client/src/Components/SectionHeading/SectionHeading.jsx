/* eslint-disable react/prop-types */


const SectionHeading = ({subHeading,heading}) => {
    return (
        <div className="max-w-xs mx-auto text-center">
            <p className="text-lg font-medium text-center">---{subHeading}---</p>
            <h1 className="text-3xl  font-semibold text-center border-y-2 mt-3 py-3 mb-8">{heading}</h1>
        </div>
    );
};

export default SectionHeading;