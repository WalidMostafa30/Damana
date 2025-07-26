import { useEffect, useMemo, useState } from "react";

const Timer = ({ hours = 0, minutes = 0, onFinish }) => {
  const initialSeconds = useMemo(
    () => hours * 3600 + minutes * 60,
    [hours, minutes]
  );

  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (seconds <= 0) return;

    const id = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          onFinish ? onFinish() : alert("انتهى الوقت!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [seconds, onFinish]);

  const displayHours = Math.floor(seconds / 3600);
  const displayMinutes = Math.floor((seconds % 3600) / 60);

  return (
    <div className="flex items-center gap-1 text-xl font-bold">
      <div className="flex flex-col items-center gap-1">
        <span className="p-2 rounded-lg text-primary bg-secondary/20">
          {String(displayMinutes).padStart(2, "0")}
        </span>
        <p className="text-sm text-neutral-500">دقيقه</p>
      </div>

      <span className="mb-6">:</span>

      <div className="flex flex-col items-center gap-1">
        <span className="p-2 rounded-lg text-primary bg-secondary/20">
          {String(displayHours).padStart(2, "0")}
        </span>
        <p className="text-sm text-neutral-500">ساعه</p>
      </div>
    </div>
  );
};

export default Timer;
