import { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdCloudDownload, MdCloudUpload } from "react-icons/md";
import { useTranslation } from "react-i18next";

const FileUploadSection = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const downloadTemplateRef = useRef(null);
  const uploadFileRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    console.log("Dropped file:", files[0]);
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
      {/* زر فتح / إغلاق */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 font-bold text-secondary cursor-pointer hover:brightness-75 transition"
      >
        {t("pages.fileUploadSection.title")}
        <IoIosArrowDown
          className={`${isOpen ? "rotate-180" : ""} duration-300 text-2xl`}
        />
      </button>

      {/* المحتوى القابل للفتح */}
      <div
        className={`transition-all ease-in-out duration-500 overflow-hidden ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        {/* الخطوة الأولى: تحميل القالب */}
        <div
          className="p-4 border-b border-neutral-300 space-y-2 rounded-lg bg-white"
          onClick={() => downloadTemplateRef.current?.click()}
        >
          <h2 className="text-xl text-primary font-semibold">
            {t("pages.fileUploadSection.step1.title")}
          </h2>
          <p className="text-neutral-500 font-medium">
            {t("pages.fileUploadSection.step1.description")}
          </p>

          <div className="flex items-center gap-2 text-secondary">
            <MdCloudDownload className="text-5xl" />
            <div className="flex-1 border border-dashed border-neutral-300 font-medium p-4 rounded-lg cursor-pointer">
              <p>{t("pages.fileUploadSection.step1.downloadTemplate")}</p>
              <input
                ref={downloadTemplateRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log("قالب تم تحميله:", file);
                }}
              />
            </div>
          </div>
        </div>

        {/* الخطوة الثانية: رفع الملف */}
        <div
          className="p-4 border-b border-neutral-300 space-y-2 rounded-lg bg-white"
          onClick={() => uploadFileRef.current?.click()}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <h2 className="text-xl text-primary font-semibold">
            {t("pages.fileUploadSection.step2.title")}
          </h2>
          <p className="text-neutral-500 font-medium">
            {t("pages.fileUploadSection.step2.description")}
          </p>

          <div className="flex items-center gap-2 text-success-200">
            <MdCloudUpload className="text-5xl" />
            <div
              className={`flex-1 border border-dashed border-neutral-300 font-medium p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                dragActive ? "bg-success-100 border-blue-400" : "bg-white"
              }`}
            >
              <p>{t("pages.fileUploadSection.step2.uploadText")}</p>
              <input
                ref={uploadFileRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log("تم رفع الملف:", file);
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
