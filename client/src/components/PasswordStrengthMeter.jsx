import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <Check className="h-4 w-4 text-[#007BFF] mr-2" />
          ) : (
            <X className="h-4 w-4 text-[#9CA3AF] mr-2" />
          )}
          <span className={item.met ? "text-[#007BFF]" : "text-[#9CA3AF]"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength === 0) return "bg-[#EF4444]"; // red
    if (strength === 1) return "bg-[#EF4444]/80"; // lighter red
    if (strength === 2) return "bg-[#9CA3AF]"; // muted gray
    if (strength === 3) return "bg-[#007BFF]/80"; // lighter blue
    return "bg-[#007BFF]"; // strong blue
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-[#9CA3AF]">Password strength</span>
        <span className="text-xs text-[#9CA3AF]">
          {getStrengthText(strength)}
        </span>
      </div>

      <div className="flex space-x-1 mb-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 
              ${index < strength ? getColor(strength) : "bg-[#333333]"}
            `}
          />
        ))}
      </div>

      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
