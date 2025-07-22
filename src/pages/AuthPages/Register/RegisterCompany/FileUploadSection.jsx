import { useRef, useState } from "react";
import { ChevronDown, CloudDownload, CloudUpload } from "lucide-react";

const FileUploadSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const downloadTemplateRef = useRef(null); // المرجع الأول
  const uploadFileRef = useRef(null); // المرجع الثاني

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    console.log("Dropped file:", files[0]);
    // هنا ممكن ترفع الملف
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 font-bold text-secondary cursor-pointer hover:brightness-75 transition"
      >
        تحميل الملف وتعبئته ثم رفعه (Excel أو CSV)
        <ChevronDown className={`${isOpen ? "rotate-180" : ""} duration-300`} />
      </button>

      <div
        className={`transition-all ease-in-out duration-500 overflow-hidden ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        {/* تحميل القالب */}
        <div
          className="p-4 border-b border-neutral-300 space-y-2 rounded-lg bg-white"
          onClick={() => downloadTemplateRef.current?.click()}
        >
          <h2 className="text-xl text-primary font-semibold">
            الخطوة الأولى: تحميل القالب
          </h2>
          <p className="text-neutral-500 font-medium">
            استخدم الملف لإدخال البيانات بشكل صحيح
          </p>

          <div className="flex items-center gap-2 text-secondary">
            <CloudDownload size={40} />
            <div className="flex-1 border border-dashed border-neutral-300 font-medium p-4 rounded-lg cursor-pointer">
              <p>تحميل قالب البيانات</p>
              <input
                ref={downloadTemplateRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log("قالب تم تحميله:", file);
                  // يمكنك التعامل مع القالب هنا
                }}
              />
            </div>
          </div>
        </div>

        {/* رفع الملف */}
        <div
          className="p-4 border-b border-neutral-300 space-y-2 rounded-lg bg-white"
          onClick={() => uploadFileRef.current?.click()}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <h2 className="text-xl text-primary font-semibold">
            الخطوة الثانية: رفع الملف
          </h2>
          <p className="text-neutral-500 font-medium">
            اسحب الملف هنا أو اضغط لاختياره من الجهاز
          </p>

          <div className={`flex items-center gap-2 text-success-200`}>
            <CloudUpload size={40} />
            <div
              className={`flex-1 border border-dashed border-neutral-300 font-medium p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                dragActive ? "bg-success-100 border-blue-400" : "bg-white"
              }`}
            >
              <p>اسحب الملف هنا أو اضغط لاختياره</p>
              <input
                ref={uploadFileRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log("تم رفع الملف:", file);
                  // يمكنك رفع الملف هنا إلى السيرفر
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadSection;
