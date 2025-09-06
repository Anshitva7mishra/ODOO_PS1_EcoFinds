const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="w-5 h-5 text-[#007BFF]" />
      </div>
      <input
        {...props}
        className="
          w-full 
          pl-10 pr-3 py-2 
          bg-transparent 
          rounded-lg 
          border border-[#333333] 
          focus:border-[#007BFF] 
          focus:ring-2 focus:ring-[#007BFF] 
          text-[#FFFFFF] 
          placeholder-[#9CA3AF] 
          transition duration-200
        "
      />
    </div>
  );
};

export default Input;
