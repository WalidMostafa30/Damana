const StepProgressCol = ({ steps, currentStep }) => {
  return (
    <div
      className="flex flex-col justify-between gap-4 lg:gap-8 relative 
    after:absolute after:top-0 after:start-4 lg:after:start-5 after:w-px after:h-full 
    after:border after:border-dashed after:border-neutral-300 after:z-[-1]"
    >
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <span
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

          <p className="lg:text-lg font-bold">{label}</p>
        </div>
      ))}
    </div>
  );
};
export default StepProgressCol;
