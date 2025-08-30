import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../../components/common/Avatar";
import LoadingSection from "../../../components/Loading/LoadingSection";
import MobileSteps1 from "./MobileSteps/MobileSteps1";
import MobileSteps2 from "./MobileSteps/MobileSteps2";
import BackStepBtn from "../../../components/form/BackStepBtn";
import { FaRegEdit } from "react-icons/fa";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profile, loading } = useSelector((state) => state.profile);

  const [newPhoneNumber, setNewPhoneNumber] = useState({
    mobile: "",
    country_code: "",
  });

  useEffect(() => {
    console.log("📌 New phone number state:", newPhoneNumber);
  }, [newPhoneNumber]);

  const [step, setStep] = useState(1);

  if (loading) return <LoadingSection />;

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
        <div className="flex gap-2">
          <Avatar
            image={profile?.profile_image_full_path}
            name={profile?.name}
            size="lg"
          />
          <div>
            <h3 className="text-lg lg:text-2xl font-bold text-primary mb-1">
              {profile?.name || ""}
            </h3>
            <p>{profile?.full_mobile}</p>
          </div>
        </div>

        {step === 1 && (
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className={`border border-neutral-300 px-4 py-2 rounded-xl flex items-center gap-2 lg:text-lg cursor-pointer ${
              isEditing ? "bg-secondary/30 border-secondary/30" : ""
            }`}
          >
            <FaRegEdit />
            تعديل
          </button>
        )}
      </div>

      {step === 1 && (
        <MobileSteps1
          profile={profile}
          setNewPhoneNumber={setNewPhoneNumber}
          goNext={() => setStep(2)}
          isEditing={isEditing}
        />
      )}
      {step === 2 && (
        <MobileSteps2
          newPhoneNumber={newPhoneNumber}
          goBack={() => setStep(1)}
        />
      )}

      <BackStepBtn step={step - 1} goBack={() => setStep(1)} />
    </>
  );
};

export default Profile;
