import { MdCloudUpload } from "react-icons/md";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const FileInput = ({ labelKey, name, formik, error }) => {
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);
  const fileValue = formik.values[name];

  const handleFiles = (files) => {
    if (files && files[0]) {
      formik.setFieldValue(name, files[0]); // نخزن الملف كـ File object
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

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t(`pages.Step4Company.fileLabels.${labelKey}`)}
      </label>

      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-300 ${
          dragActive ? "border-primary bg-primary/5" : "border-gray-300"
        } hover:border-primary`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          name={name}
          id={name}
          accept=".pdf,image/*"
          onChange={(event) => handleFiles(event.currentTarget.files)}
          className="hidden"
        />

        <label
          htmlFor={name}
          className="cursor-pointer flex flex-col items-center"
        >
          <MdCloudUpload className="mx-auto text-gray-400 text-5xl" />
          {!fileValue ? (
            <p className="text-sm text-gray-500 mt-2">
              {t("pages.Step4Company.fileInput.dragDropText")}
            </p>
          ) : (
            <p className="text-sm text-green-600 mt-2">
              {t("pages.Step4Company.fileInput.fileUploaded", {
                fileName: fileValue.name,
              })}
            </p>
          )}
        </label>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const Step4Company = ({ formik, getError }) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      <FileInput
        labelKey="commercial_register"
        name="file_commercial_register"
        formik={formik}
        error={getError("file_commercial_register")}
      />

      <FileInput
        labelKey="memorandum_association"
        name="file_memorandum_association"
        formik={formik}
        error={getError("file_memorandum_association")}
      />

      <FileInput
        labelKey="professional_license"
        name="file_Professional_License_lease_contract"
        formik={formik}
        error={getError("file_Professional_License_lease_contract")}
      />

      <FileInput
        labelKey="identity_document"
        name="file_identity_document_signatories"
        formik={formik}
        error={getError("file_identity_document_signatories")}
      />
    </div>
  );
};

export default Step4Company;
