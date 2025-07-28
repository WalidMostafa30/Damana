const StepProgress = ({ steps, currentStep }) => {
  return (
    <div
      className="flex justify-between gap-4 mb-4 lg:mb-8 relative 
      before:absolute before:top-1/2 before:left-0 before:w-full
      before:h-[2px] before:bg-neutral-300"
    >
      {steps.map((label, i) => (
        <span
          key={i}
          className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center lg:text-lg font-bold border transition-all relative z-10 ${
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

export default StepProgress;
