const SettingsTab = ({ name, icon }) => {
    return (
        <div className="w-full flex text-[1.2rem] font-semibold justify-center items-center gap-2 p-2 bg-[#4A4B57] rounded-lg shadow-md hover:shadow-custom cursor-pointer">
            {icon}
            <p>{name}</p>
        </div>
    );
};

export default SettingsTab;
