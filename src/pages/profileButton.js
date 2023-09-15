import React, { useState } from "react";

const ProfileButton = ({ callback }) => {
  const [showModal, setShowModal] = useState(false);
  const [nextSection, setNextSection] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  const handleConfirmButton = () => {
    if (!nextSection) {
      setNextSection(true);
    } else {
      setShowModal(false);
      setNextSection(false);
      callback({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        instagram: instagram,
        youtube: youtube,
      });
    }
  };

  const handleOnChanged = (event, setFunc) => {
    setFunc(event.target.value);
  };

  const optionallyDisplayBackButton = () => {
    if (!nextSection) {
      return null;
    } else {
      return (
        <button
          className="mt-5 mr-3 mb-3 bg-white border-[#999CA0] border rounded-lg font-figtree font-semibold text-sm px-5 py-3 shadow hover:shadow-lg outline-none focus:outline-none"
          type="button"
          onClick={() => setNextSection(false)}
        >
          Back
        </button>
      );
    }
  };

  const basicProfileForm = () => {
    return (
      <div>
        <div className="relative px-6 pt-6 flex flex-col gap-y-3">
          <p className="font-figtree text-sm">Enter Name*</p>
          <div className="border rounded-lg bg-white h-12 flex flex-row items-center">
            <input
              className="font-lato placeholder-search-gray text-base caret-search-gray w-auto outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Eg. John Doe"
              onChange={(e) => handleOnChanged(e, setName)}
            />
          </div>
        </div>
        <div className="relative px-6 pt-6 flex flex-col gap-y-3">
          <p className="font-figtree text-sm">Enter Email*</p>
          <div className="border rounded-lg bg-white h-12 flex flex-row items-center">
            <input
              type="email"
              className="font-lato placeholder-search-gray text-base caret-search-gray w-auto outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Eg. John@xyz.com"
              onChange={(e) => handleOnChanged(e, setEmail)}
            />
          </div>
        </div>
        <div className="relative px-6 py-6 flex flex-col gap-y-3">
          <p className="font-figtree text-sm">Enter Phone*</p>
          <div className="border rounded-lg bg-white h-12 flex flex-row items-center">
            <input
              className="font-lato placeholder-search-gray text-base caret-search-gray w-auto outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Eg. 9123456789"
              onChange={(e) => handleOnChanged(e, setPhoneNumber)}
            />
          </div>
        </div>
      </div>
    );
  };

  const socialProfileForm = () => {
    return (
      <div>
        <div className="relative px-6 pt-6 flex flex-col gap-y-3">
          <div className="flex flex-row gap-x-1">
            <p className="font-figtree text-sm">Instagram Link</p>
            <p className="font-figtree text-sm text-[#999CA0]">(Optional)</p>
          </div>
          <div className="border rounded-lg bg-white h-12 flex flex-row items-center">
            <input
              type="email"
              className="font-lato placeholder-search-gray text-base caret-search-gray w-auto outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Eg. instagram.com/username"
              onChange={(e) => handleOnChanged(e, setInstagram)}
            />
          </div>
        </div>
        <div className="relative px-6 py-6 flex flex-col gap-y-3">
          <div className="flex flex-row gap-x-1">
            <p className="font-figtree text-sm">Youtube Link</p>
            <p className="font-figtree text-sm text-[#999CA0]">(Optional)</p>
          </div>
          <div className="border rounded-lg bg-white h-12 flex flex-row items-center">
            <input
              className="font-lato placeholder-search-gray text-base caret-search-gray w-auto outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Eg. youtube/username"
              onChange={(e) => handleOnChanged(e, setYoutube)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <button type="button" onClick={() => setShowModal(true)}>
        <div className="w-24 h-24 profile-button border rounded-full border-1 border-profile-button flex justify-center items-center">
          {/**TODO: Replace with + icon*/}
          <p className="text-5xl">+</p>
        </div>
      </button>
      {showModal ? (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t px-4 py-4">
                <h3 className="font-figtree text-xl self-start">
                  Add New Profile
                </h3>
                <button
                  onClick={() => {
                    setNextSection(false);
                    setShowModal(false);
                  }}
                >
                  <div className="text-[#999CA0] h-6 w-6 text-2xl block outline-none focus:outline-none">
                    X
                  </div>
                </button>
              </div>
              <div className="flex flex-row justify-center font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap mt-4">
                  <li className="mr-2">
                    <p className="inline-block p-4 border-b-2 border-blue-600 rounded-t-lg active">
                      Profile
                    </p>
                  </li>
                  <li className="mr-2">
                    <p
                      className="inline-block p-4 text-black border-b-2 border-transparent rounded-t-lg"
                      aria-current="page"
                    >
                      Social
                    </p>
                  </li>
                </ul>
              </div>
              {!nextSection ? basicProfileForm() : socialProfileForm()}
              <div className="flex items-center justify-end p-6 border-t border-solid border-[#F7F7F7] rounded-b">
                {optionallyDisplayBackButton()}
                <button
                  className="mt-5 mr-3 mb-3 bg-next-button text-white border rounded-lg text-white font-figtree font-semibold text-sm px-5 py-3 shadow hover:shadow-lg outline-none focus:outline-none"
                  type="button"
                  onClick={() => handleConfirmButton()}
                >
                  {nextSection ? "Done" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileButton;
