import { MdCloudUpload } from "react-icons/md";

const FileInput = ({ label, name, formik, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-all duration-300">
        <input
          type="file"
          name={name}
          id={name}
          onChange={(event) => {
            formik.setFieldValue(name, event.currentTarget.files[0]);
          }}
          className="hidden"
        />
        <label htmlFor={name} className="cursor-pointer">
          <MdCloudUpload className="mx-auto text-gray-400 text-5xl" />
          <p className="text-sm text-gray-500 mt-2">
            اسحب الملف هنا أو اضغط لاختياره
          </p>
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const Step4Company = ({ formik, getError }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <FileInput
          label="نسخة حديثة من السجل التجاري"
          name="file_commercial_register"
          formik={formik}
          error={getError("file_commercial_register")}
        />

        <FileInput
          label="نسخة من عقد التأسيس"
          name="file_memorandum_association"
          formik={formik}
          error={getError("file_memorandum_association")}
        />

        <FileInput
          label="نسخة عن رخصة المزاولة و/أو نسخة عن عقد إيجار مصدق"
          name="file_Professional_License_lease_contract"
          formik={formik}
          error={getError("file_Professional_License_lease_contract")}
        />

        <FileInput
          label="إثبات الشخصية للمفوضين بالتوقيع"
          name="file_identity_document_signatories"
          formik={formik}
          error={getError("file_identity_document_signatories")}
        />
      </div>
    </>
  );
};

export default Step4Company;
