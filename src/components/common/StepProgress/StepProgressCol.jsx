const StepProgressCol = ({ steps, currentStep }) => {
  return (
    <div
      className="flex justify-between gap-4 mb-10 relative 
      before:absolute before:top-1/2 before:left-0 before:w-full
      before:h-[2px] before:bg-neutral-300 before:z-[-1]"
    >
      {steps.map((label, i) => (
        <span
          key={label}
          className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center lg:text-lg font-bold border transition-all ${
            i === currentStep
              ? "bg-primary-light border-primary-light drop-shadow-[2px_4px_4px_rgba(0,0,0,0.50)] text-white"
              : i < currentStep
              ? "bg-primary border-primary text-white"
              : "bg-white border-neutral-300 text-neutral-500"
          }`}
        >
          {i + 1}
        </span>
      ))}
    </div>
  );
};
export default StepProgressCol;
