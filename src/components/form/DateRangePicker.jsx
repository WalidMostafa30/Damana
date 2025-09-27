import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePicker = ({
  value,
  onChange,
  onClose,
  isOpen,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const tempRange = value || {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full md:w-auto md:rounded-lg md:shadow-lg p-4 overflow-auto" dir="ltr">
        {/* Date Picker */}
        <DateRange
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          ranges={[tempRange]}
          className="w-full"
          onChange={(item) => onChange(item.selection)}
        />

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            className="mainBtn flex-1"
            onClick={() => onClose()} // إغلاق بدون اختيار
          >
            {cancelText}
          </button>
          <button
            className="mainBtn flex-1"
            onClick={() => {
              onChange(tempRange); // تأكيد القيمة
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
