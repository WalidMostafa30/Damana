import { IoMdTime } from "react-icons/io";

const Notification = () => {
  const notifications = [
    {
      id: 1,
      company: "شركه مرسيدس للسيارات",
      number: "#123",
      time: "7 ساعات",
    },
    {
      id: 2,
      company: "شركه BMW للسيارات",
      number: "#456",
      time: "3 ساعات",
    },
    {
      id: 3,
      company: "شركه هيونداي للسيارات",
      number: "#789",
      time: "10 ساعات",
    },
  ];

  return (
    <section className="pageContainer space-y-4">
      <PageTitle
        title="الاشعارات"
        subtitle="هنا جميع الاشعارات الخاصة بك التي تحتوي على كافة معلوماتك وحالات ضماناتك"
      />

      <div className="space-y-4 rounded-2xl bg-base-white border border-neutral-200">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex gap-4 p-4 cursor-pointer not-last:border-b border-neutral-200"
          >
            <div
              dir="ltr"
              className="w-16 h-16 text-3xl font-bold bg-white rounded-full border border-neutral-300 flex items-center justify-center"
            >
              <span className="text-primary">R</span>
              <span className="text-secondary">A</span>
            </div>

            <div className="space-y-2 flex-1">
              <p className="text-neutral-800 flex-1 text-xl">
                <span className="font-bold text-primary">{n.company}</span>{" "}
                ارسلت اليك طلب ضمانه لمتابعه عمليه البيع وعمليه نقل الملكيه
                لضمانه رقمها{" "}
                <span className="font-bold text-primary">{n.number}</span>
              </p>

              <p className="text-neutral-500 text-lg flex items-center gap-1">
                <IoMdTime />
                {n.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notification;
