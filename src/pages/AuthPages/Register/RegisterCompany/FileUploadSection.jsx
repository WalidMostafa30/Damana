import { useRef, useState } from "react";
import { MdCloudDownload, MdCloudUpload } from "react-icons/md";
import { useTranslation } from "react-i18next";

const FileUploadSection = ({ downloadLink, value, onChange, error }) => {
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);

  const uploadFileRef = useRef(null);

  const handleFileSelect = (file) => {
    onChange?.(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
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
    <>
      {/* الخطوة الأولى: تحميل القالب */}
      <div className="p-4 border-b border-neutral-300 space-y-2 rounded-lg bg-white">
        <h2 className="text-xl text-primary font-semibold">
          {t("pages.fileUploadSection.step1.title")}
        </h2>
        <p className="text-neutral-500 font-medium">
          {t("pages.fileUploadSection.step1.description")}
        </p>

        <div className="flex items-center gap-2 text-secondary">
          <MdCloudDownload className="text-5xl" />
          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-dashed border-neutral-300 font-medium p-4 rounded-lg cursor-pointer hover:bg-neutral-50 transition"
          >
            {t("pages.fileUploadSection.step1.downloadTemplate")}
          </a>
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
                if (file) handleFileSelect(file);
              }}
            />
          </div>
        </div>

        {/* ✅ عرض اسم الملف المختار */}
        {value && (
          <p className="mt-2 text-sm text-green-600 font-medium">
            {t("pages.fileUploadSection.selectedFile")}:{" "}
            <span className="text-neutral-700">{value.name}</span>
          </p>
        )}

        {/* عرض الخطأ لو موجود */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </>
  );
};

export default FileUploadSection;
