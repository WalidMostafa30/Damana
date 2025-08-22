import { IoMdWarning } from "react-icons/io";

const SmartAlertsCard = () => {
  return (
    <div className="whiteContainer lg:col-span-3">
      <h3 className="text-lg font-semibold mb-4">التنبيهات الحالية</h3>

      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <IoMdWarning className="w-5 h-5 text-yellow-600" />
          <div>
            <div className="font-medium">تنبيه</div>
            <div className="text-sm text-gray-600">
              يتطلب مراجعة الطلب رقم 1046 من المدير
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAlertsCard;
