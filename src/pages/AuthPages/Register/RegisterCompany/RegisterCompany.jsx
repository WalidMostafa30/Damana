import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthBreadcrumbs from "../../../../components/common/AuthBreadcrumbs";
import StepProgress from "../../../../components/common/StepProgress/StepProgress";
import FileUploadSection from "./FileUploadSection";
import Step0Company from "./steps/Step0Company";
import Step1Company from "./steps/Step1Company";
import Step2Company from "./steps/Step2Company";
import Step3Company from "./steps/Step3Company";
import Step4Company from "./steps/Step4Company";
import Step5Company from "./steps/Step5Company";
import Step6Company from "./steps/Step6Company";
import AuthLayout from "../../../../components/common/AuthLayout";
import get from "lodash.get";
import FormError from "../../../../components/form/FormError";
import FormBtn from "../../../../components/form/FormBtn";
import { Link, useNavigate } from "react-router-dom";
import ActionModal from "../../../../components/modals/ActionModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  registerCompany,
  registerCompanyFile,
} from "../../../../services/authService";
import BackStepBtn from "../../../../components/form/BackStepBtn";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { getSamplesLinks } from "../../../../services/staticDataService";

const FILE_SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
];

const RegisterCompany = () => {
  const [step, setStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const steps = t("pages.registerCompany.steps", { returnObjects: true });

  // ✅ تنظيف IBAN من المسافات وتحويله كابيتال
  const cleanIban = (value) =>
    value ? value.replace(/\s+/g, "").toUpperCase() : "";

  const partnerYup = Yup.object({
    full_name: Yup.string().required(
      t("pages.registerCompany.validation.required")
    ),
    nationality: Yup.string().required(
      t("pages.registerCompany.validation.required")
    ),
    national_passport_number: Yup.string().required(
      t("pages.registerCompany.validation.required")
    ),
    address: Yup.string().required(
      t("pages.registerCompany.validation.required")
    ),
    phone: Yup.string().required(
      t("pages.registerCompany.validation.required")
    ),
    email: Yup.string()
      .email(t("pages.registerCompany.validation.invalidEmail"))
      .required(t("pages.registerCompany.validation.required")),
  });

  const stepSchemas = [
    // Step 1
    Yup.object({
      ar_name: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      en_name: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      commercial_ar_name: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      commercial_en_name: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      registration_type_legal_form: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      country_registration: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      registration_authority: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      commercial_registration_number: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      registration_date: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      national_number: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      website_url: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      license_number: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      address: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      email: Yup.string()
        .email(t("pages.registerCompany.validation.invalidEmail"))
        .required(t("pages.registerCompany.validation.required")),
      phone: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      tax_number: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      capital_equity: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      signed_name: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
    }),

    // Step 2
    Yup.object({
      partners: Yup.array()
        .of(partnerYup)
        .min(1, t("pages.registerCompany.validation.minOnePartner")),
    }),

    // Step 3
    Yup.object({
      commissioners_text: Yup.string().required(
        t("pages.registerCompany.validation.required")
      ),
      commissioners_type: Yup.string()
        .required("اختيار طريقة الإدخال مطلوب")
        .oneOf(["form", "excel"], "طريقة الإدخال غير صحيحة"),
      commissioners: Yup.array().when("commissioners_type", {
        is: "form",
        then: (schema) =>
          schema
            .of(
              Yup.object({
                full_name: Yup.string().required("اسم المفوض مطلوب"),
                nationality: Yup.string().required("الجنسية مطلوبة"),
                national_passport_number: Yup.string().required(
                  "الرقم القومي أو رقم الجواز مطلوب"
                ),
                job: Yup.string().required("الوظيفة مطلوبة"),
                address: Yup.string().required("العنوان مطلوب"),
                phone: Yup.string()
                  .required("رقم الهاتف مطلوب")
                  .matches(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
                email: Yup.string()
                  .email("البريد الإلكتروني غير صالح")
                  .required("البريد الإلكتروني مطلوب"),
              })
            )
            .min(1, "يجب إضافة مفوض واحد على الأقل"),
        otherwise: (schema) => schema.notRequired(),
      }),
      company_commissioner_file: Yup.mixed().when("commissioners_type", {
        is: "excel",
        then: (schema) =>
          schema
            .required("ملف التفويض مطلوب")
            .test("fileType", "صيغة الملف غير مدعومة", (value) => {
              if (!value) return false;
              return [
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              ].includes(value.type);
            }),
        otherwise: (schema) => schema.notRequired(),
      }),
      managementCommissioners: partnerYup,
    }),

    // ✅ Step 4 بعد حذف isValid
    Yup.object({
      bank_id: Yup.string().required(
        t("pages.registerCompany.validation.bankNameRequired")
      ),
      iban: Yup.string()
        .transform((value) => cleanIban(value))
        .matches(
          /^[A-Z0-9]+$/,
          t("pages.registerCompany.validation.invalidIban")
        )
        .min(30, t("pages.registerCompany.validation.invalidIban"))
        .max(30, t("pages.registerCompany.validation.invalidIban"))
        .required(t("pages.registerCompany.validation.ibanRequired")),
      currency: Yup.string().required(
        t("pages.registerCompany.validation.currencyRequired")
      ),
      clik_name: Yup.string(),
    }),

    // Step 5
    Yup.object({
      file_commercial_register: Yup.mixed()
        .required(
          t("pages.registerCompany.validation.commercialRegisterRequired")
        )
        .test(
          "fileFormat",
          t("pages.registerCompany.validation.unsupportedFileFormat"),
          (value) => value && FILE_SUPPORTED_FORMATS.includes(value.type)
        ),
      file_memorandum_association: Yup.mixed()
        .required(t("pages.registerCompany.validation.memorandumRequired"))
        .test(
          "fileFormat",
          t("pages.registerCompany.validation.unsupportedFileFormat"),
          (value) => value && FILE_SUPPORTED_FORMATS.includes(value.type)
        ),
      file_Professional_License_lease_contract: Yup.mixed()
        .required(t("pages.registerCompany.validation.licenseRequired"))
        .test(
          "fileFormat",
          t("pages.registerCompany.validation.unsupportedFileFormat"),
          (value) => value && FILE_SUPPORTED_FORMATS.includes(value.type)
        ),
      file_identity_document_signatories: Yup.mixed()
        .required(t("pages.registerCompany.validation.identityRequired"))
        .test(
          "fileFormat",
          t("pages.registerCompany.validation.unsupportedFileFormat"),
          (value) => value && FILE_SUPPORTED_FORMATS.includes(value.type)
        ),
    }),

    // Step 6
    Yup.object({
      acknowledgement: Yup.boolean().oneOf(
        [true],
        t("pages.registerCompany.validation.acknowledgeRequired")
      ),
    }),

    // Step 7
    Yup.object({
      group_id: Yup.object(),
      accept_policy_terms: Yup.boolean().oneOf(
        [true],
        t("pages.registerCompany.validation.termsRequired")
      ),
      login_accounts: Yup.object(),
    }),
  ];

  // باقي الكود كما هو 🔽 (لم يتم تغييره)
  const mutation = useMutation({
    mutationFn: registerCompany,
    onSuccess: () => setOpenModal(true),
    onError: (error) => {
      setErrorMsg(
        error?.response?.data?.error_msg ||
          t("pages.registerCompany.errors.registrationError")
      );
    },
  });

  const buildFormData = (formData, data, parentKey = "") => {
    if (data && typeof data === "object" && !(data instanceof File)) {
      Object.entries(data).forEach(([key, value]) => {
        const fullKey = parentKey ? `${parentKey}[${key}]` : key;
        buildFormData(formData, value, fullKey);
      });
    } else {
      formData.append(parentKey, data);
    }
  };

  const formik = useFormik({
    initialValues: {
      ar_name: "",
      en_name: "",
      commercial_ar_name: "",
      commercial_en_name: "",
      registration_type_legal_form: "",
      country_registration: "",
      registration_authority: "",
      commercial_registration_number: "",
      registration_date: "",
      national_number: "",
      website_url: "",
      license_number: "",
      address: "",
      email: "",
      phone: "",
      tax_number: "",
      capital_equity: "",
      signed_name: "",
      partners: [
        {
          full_name: "",
          nationality: "",
          national_passport_number: "",
          address: "",
          phone: "",
          email: "",
        },
      ],
      commissioners_text: "",
      commissioners_type: "form",
      commissioners: [
        {
          full_name: "",
          nationality: "",
          national_passport_number: "",
          job: "",
          address: "",
          type: "",
          top_commissioner: "",
          commissioner_permissions: "",
          phone: "",
          email: "",
          delegation_permissions: "",
        },
      ],
      company_commissioner_file: null,
      managementCommissioners: {
        full_name: "",
        nationality: "",
        national_passport_number: "",
        address: "",
        type: "",
        top_commissioner: "",
        commissioner_permissions: "",
        phone: "",
        email: "",
        delegation_permissions: "",
      },
      bank_id: "",
      iban: "",
      swift_code: "",
      currency: "",
      clik_name: "",
      file_commercial_register: null,
      file_memorandum_association: null,
      file_Professional_License_lease_contract: null,
      file_identity_document_signatories: null,
      acknowledgement: false,
      group_id: {},
      accept_policy_terms: false,
      login_accounts: {},
    },
    validationSchema: stepSchemas[step],
    validateOnBlur: true,
    onSubmit: (values) => {
      setErrorMsg("");

      if (values.commissioners_type === "excel") {
        values.commissioners = null;
      } else if (values.commissioners_type === "form") {
        delete values.company_commissioner_file;
      }

      if (step < steps.length - 1) {
        setStep((prev) => prev + 1);
        formik.setTouched({});
      } else {
        const formData = new FormData();
        buildFormData(formData, values);
        mutation.mutate(formData);
      }
    },
  });

  const getError = (name) => {
    const touched = get(formik.touched, name);
    const error = get(formik.errors, name);
    return touched && error ? error : "";
  };

  const { data } = useQuery({
    queryFn: () => getSamplesLinks(),
    queryKey: ["samplesLinks"],
    keepPreviousData: true,
  });

  const fileUploadMutation = useMutation({
    mutationFn: registerCompanyFile,
    onSuccess: (res) => {
      formik.setFieldValue("company_commissioner_file", res?.file_path || null);
    },
  });

  const companyExcelLink = data?.company_sample;
  const commissionerExcelLink = data?.company_commissioner_sample;

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step0Company formik={formik} getError={getError} />;
      case 1:
        return <Step1Company formik={formik} getError={getError} />;
      case 2:
        return (
          <Step2Company
            formik={formik}
            getError={getError}
            commissionerExcelLink={commissionerExcelLink}
          />
        );
      case 3:
        return <Step3Company formik={formik} getError={getError} />;
      case 4:
        return <Step4Company formik={formik} getError={getError} />;
      case 5:
        return <Step5Company formik={formik} getError={getError} />;
      case 6:
        return <Step6Company formik={formik} getError={getError} />;
      default:
        return null;
    }
  };

  const goBack = () => setStep((prev) => prev - 1);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthLayout>
      <AuthBreadcrumbs
        title={t("pages.registerCompany.pageTitle")}
        items={[
          { label: t("pages.registerCompany.breadcrumbs.home"), path: "/" },
          { label: t("pages.registerCompany.breadcrumbs.companyRegistration") },
        ]}
      />

      {step === 0 && (
        <div className="mb-8">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full flex items-center justify-between py-4 font-bold text-secondary cursor-pointer hover:brightness-75 transition"
          >
            {t("pages.fileUploadSection.title")}
            <IoIosArrowDown
              className={`${isOpen ? "rotate-180" : ""} duration-300 text-2xl`}
            />
          </button>

          <div
            className={`transition-all ease-in-out duration-500 overflow-hidden ${
              isOpen ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            <FileUploadSection
              downloadLink={companyExcelLink}
              value={formik.values.company_commissioner_file}
              error={getError("company_commissioner_file")}
              onChange={(file) => {
                const formData = new FormData();
                formData.append("company_file", file);
                fileUploadMutation.mutate(formData);
              }}
            />
          </div>
        </div>
      )}

      <StepProgress steps={steps} currentStep={step} />

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-lg text-white font-bold bg-primary p-4 rounded-e-2xl w-fit">
          {steps[step]}
        </h3>

        {renderStep()}

        <FormError errorMsg={errorMsg} />

        <FormBtn
          title={
            step < steps.length - 1
              ? t("pages.registerCompany.buttons.next")
              : t("pages.registerCompany.buttons.finish")
          }
          loading={mutation.isPending}
        />

        <p className="text-center font-semibold text-sm lg:text-base">
          {t("pages.registerCompany.links.alreadyHaveAccount")}{" "}
          <Link
            to="/login"
            className="text-secondary hover:brightness-50 transition-colors"
          >
            {t("pages.registerCompany.links.login")}
          </Link>
        </p>

        {!mutation.isPending && <BackStepBtn step={step} goBack={goBack} />}
      </form>

      <ActionModal
        openModal={openModal}
        msg={t("pages.registerCompany.modal.successMessage")}
        primaryBtn={{
          text: t("pages.registerCompany.modal.goToLogin"),
          action: () => {
            setOpenModal(false);
            navigate("/login");
          },
        }}
      />
    </AuthLayout>
  );
};

export default RegisterCompany;
