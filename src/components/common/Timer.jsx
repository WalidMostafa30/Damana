import { useEffect, useState } from "react";

const Timer = ({ expiryDate, onFinish }) => {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!expiryDate) return;

    const targetTime = new Date(expiryDate).getTime();

    const timerId = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, Math.floor((targetTime - now) / 1000)); // ثواني متبقية
      setRemaining(diff);

      if (diff <= 0) {
        clearInterval(timerId);
        if (onFinish) onFinish();
      }
    }, 1000);

    // تحديث فوري عند أول تحميل
    const now = new Date().getTime();
    const diff = Math.max(0, Math.floor((targetTime - now) / 1000));
    setRemaining(diff);

    return () => clearInterval(timerId);
  }, [expiryDate, onFinish]);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);

  return (
    <div className="flex items-center gap-1 text-xl font-bold">
      <div className="flex flex-col items-center gap-1">
        <span className="p-2 rounded-lg text-primary bg-secondary/20">
          {String(minutes).padStart(2, "0")}
        </span>
        <p className="text-sm text-neutral-500">دقيقة</p>
      </div>

      <span className="mb-6">:</span>

      <div className="flex flex-col items-center gap-1">
        <span className="p-2 rounded-lg text-primary bg-secondary/20">
          {String(hours).padStart(2, "0")}
        </span>
        <p className="text-sm text-neutral-500">ساعة</p>
      </div>
    </div>
  );
};

export default Timer;
