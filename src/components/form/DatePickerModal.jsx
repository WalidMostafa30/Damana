import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePickerModal = ({
  tempRange,
  setTempRange,
  onConfirm,
  onClear,
  onReset,
  onClose,
  confirmLabel = "Confirm",
  clearLabel = "Clear",
  resetLabel = "Reset",
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 m-0">
      <div
        className="bg-white w-fit rounded-lg shadow-lg p-4 overflow-auto"
        dir="ltr"
      >
        <DateRange
          editableDateInputs
          moveRangeOnFirstSelection={false}
          ranges={[tempRange]}
          className="w-full"
          onChange={(item) => setTempRange(item.selection)}
        />

        <div className="grid grid-cols-2 gap-2 mt-4">
          {/* زرار تأكيد */}
          <button className="mainBtn flex-1" onClick={onConfirm}>
            {confirmLabel}
          </button>

          {/* زرار مسح الفلتر */}
          <button
            className="mainBtn light flex-1"
            onClick={onClear}
          >
            {clearLabel}
          </button>

          {/* زرار رجوع للقيم الافتراضية */}
          <button
            className="mainBtn light flex-1"
            onClick={onReset}
          >
            {resetLabel}
          </button>

          {/* زرار إغلاق */}
          <button
            className="mainBtn danger flex-1"
            onClick={onClose}
          >
            ✖ 
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
