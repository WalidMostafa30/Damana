import { useEffect, useState } from "react";

const Timer = ({ expiryDate, onFinish }) => {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!expiryDate) return;

    const targetTime = new Date(expiryDate).getTime();
    let timerId; // ✅ تعريف قبل الاستخدام

    const updateRemaining = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, Math.floor((targetTime - now) / 1000));
      setRemaining(diff);

      if (diff <= 0) {
        clearInterval(timerId);
        if (onFinish) onFinish();
      }
    };

    updateRemaining(); // تحديث أول مرة
    timerId = setInterval(updateRemaining, 1000);

    console.log("🕒 expiryDate:", expiryDate);
    console.log("🕒 target:", new Date(expiryDate).toString());
    console.log("🕒 now:", new Date().toString());
    console.log(
      "🕒 diff (seconds):",
      (new Date(expiryDate).getTime() - Date.now()) / 1000
    );

    return () => clearInterval(timerId);
  }, [expiryDate, onFinish]);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  return (
    <div className="flex items-center gap-1 text-xl font-bold" dir="ltr">
      {/* ساعات */}
      <div className="flex flex-col items-center gap-1">
        <span className="p-2 rounded-lg text-primary bg-secondary/20">
          {String(hours).padStart(2, "0")}
        </span>
        <p className="text-sm text-neutral-500">ساعة</p>
      </div>

      <span className="mb-6">:</span>

      {/* دقايق */}
      <div className="flex flex-col items-center gap-1">
        <span className="p-2 rounded-lg text-primary bg-secondary/20">
          {String(minutes).padStart(2, "0")}
        </span>
        <p className="text-sm text-neutral-500">دقيقة</p>
      </div>

      <span className="mb-6">:</span>

      {/* ثواني */}
      <div className="flex flex-col items-center gap-1">
        <span className="p-2 rounded-lg text-primary bg-secondary/20">
          {String(seconds).padStart(2, "0")}
        </span>
        <p className="text-sm text-neutral-500">ثانية</p>
      </div>
    </div>
  );
};

export default Timer;
