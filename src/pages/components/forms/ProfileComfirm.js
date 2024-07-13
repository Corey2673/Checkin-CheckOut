import React, { useState } from "react";
import LocationComfirm from "../inputs/LocationComfirm";
import Badge_Scan from "../inputs/badge_scan";

const RegisterForm = (props) => {
  const { data } = props;
  const [profileComfirm, setProfileComfirm] = useState(false);
  const [profileExit, setProfileExit] = useState(false);
  const [profileUpdate, setProfileUpdate] = useState(false);

  if (profileComfirm) {
    return <LocationComfirm data={data[0]} />;
  }

  if (profileExit) {
    return <Badge_Scan />;
  }

  if (profileUpdate) {
    return <Badge_Scan />;
  }

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20 xl:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-x-20 gap-y-12">
          <div className="lg:order-2 lg:col-span-4 pace-x-8 bg-white rounded-lg px-8 pt-6 pb-8 mb-4 drop-shadow-2xl shadow-zinc-900">
            <div className="max-w-lg lg:max-w-none">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl lg:pr-8">
                {data[0].firstname} {data[0].lastname}
              </h2>
              <p className="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:pr-24 lg:leading-8">
                <h4 className="text-3xl font-semibold tracking-tight text-gray-550 sm:text-4xl lg:text-3xl lg:pr-8">
                  {data[0].role}
                  {data[0].role === "Vendor" && (
                    <h4 className="text-3xl font-semibold tracking-tight text-gray-550 sm:text-4xl lg:text-3xl lg:pr-8">
                      {data[0].company}
                    </h4>
                  )}
                </h4>
                <hr className="mt-5 mb-5 border-gray-200" />

                <hr className="mt-1 mb-1 border-gray-200" />

                <br />
              </p>

              <div className="mt-1">
                <button
                  onClick={() => setProfileComfirm(true)}
                  title=""
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                  role="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="grid p-12 bg-blue-100 lg:order-1 lg:col-span-3 rounded-3xl place-items-center">
            <img
              className="w-full shadow-xl rounded-xl sm:max-w-xs"
              src="/auth/computacenter.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
