import { UploadCloud } from "lucide-react";

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
          <UploadCloud className="mx-auto text-gray-400" size={32} />
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
          name="commercialReg"
          formik={formik}
          error={getError("commercialReg")}
        />

        <FileInput
          label="نسخة من عقد التأسيس"
          name="establishmentContract"
          formik={formik}
          error={getError("establishmentContract")}
        />

        <FileInput
          label="نسخة عن رخصة المزاولة و/أو نسخة عن عقد إيجار مصدق"
          name="addressLicense"
          formik={formik}
          error={getError("addressLicense")}
        />

        <FileInput
          label="إثبات الشخصية للمفوضين بالتوقيع"
          name="delegateID"
          formik={formik}
          error={getError("delegateID")}
        />
      </div>
    </>
  );
};

export default Step4Company;
