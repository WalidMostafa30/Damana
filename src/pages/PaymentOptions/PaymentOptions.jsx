import payment1 from "../../assets/images/payment1.png";
import payment2 from "../../assets/images/payment2.png";
import payment3 from "../../assets/images/payment3.png";
import payment4 from "../../assets/images/payment4.png";
import PageTitle from "../../components/common/PageTitle";

const PaymentOptions = () => {
  const paymentMethods = [
    {
      id: 1,
      name: "Fawateer",
      options: [
        "تطبيق البنكي",
        "تطبيق أي فواتيركم",
        "أو الدفع من خلال محلات الصرافة أو وكلاء أي فواتيركم",
      ],
      logo: payment1,
    },
    {
      id: 2,
      name: "VISA",
      options: [
        "تطبيق البنكي",
        "تطبيق أي فواتيركم",
        "أو الدفع من خلال محلات الصرافة أو وكلاء أي فواتيركم",
        "أو الدفع من خلال محلات الصرافة أو وكلاء أي فواتيركم",
        "أو الدفع من خلال محلات الصرافة أو وكلاء أي فواتيركم",
      ],
      logo: payment2,
    },
    {
      id: 3,
      name: "MasterCard",
      options: ["تطبيق البنكي"],
      logo: payment3,
    },
    {
      id: 4,
      name: "CLICK",
      options: [
        "تطبيق البنكي",
        "تطبيق أي فواتيركم",
        "أو الدفع من خلال محلات الصرافة أو وكلاء أي فواتيركم",
      ],
      logo: payment4,
    },
  ];

  return (
    <section className="pageContainer space-y-4">
      <PageTitle
        title="خيارات الدفع"
        subtitle="هنا لديك طرق الدفع المتاحة ، يمكنك اختيارالطريقة التي تناسبك"
      />

      <div className="space-y-4 baseWhiteContainer !border-neutral-100">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="whiteContainer flex flex-col lg:flex-row items-center gap-4"
          >
            <img src={method.logo} alt={method.name} loading="lazy" />

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                يمكنك الدفع باستخدام الرقم المرجعي للحركة من خلال:
              </h3>
              <ul className="lg:space-y-2 text-neutral-500">
                {method.options.map((option, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 ps-2 before:content-['-'] before:text-light-red before:text-2xl"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PaymentOptions;
