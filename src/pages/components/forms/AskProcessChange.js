import React, { useState, useEffect } from "react";
import DurationClock from "../inputs/DurationClock";
import dateFormat from "../../utils/dateFormat";

const UserAcknowledgementForm = ({ data, siteLocation }) => {
  const [questions, setQuestions] = useState([]);
  const [acknowledgments, setAcknowledgments] = useState([]);
  const [signature, setSignature] = useState("");
  const [acknowledgementData, setAcknowledgementData] = useState([]);

  useEffect(() => {
    // Function to fetch data from LocalStorage
    try {
      const ack_data = localStorage.getItem("change_acknowledgements");
      const question_data = localStorage.getItem("process_changes");

      if (ack_data) {
        setAcknowledgments(JSON.parse(ack_data));
        setAcknowledgementData(JSON.parse(ack_data));
      }

      if (question_data) {
        setQuestions(JSON.parse(question_data));
      }
    } catch (error) {
      console.error("Error fetching acknowledgement data:", error);
    }
  }, []);

  const acknowledgeQuestion = (
    userID,
    processID,
    firstname,
    questionTitle,
    lastname,
    questionText,
    createAT
  ) => {
    const newAcknowledgment = {
      userID,
      processID,
      lastname,
      dateFormat,
      siteLocation,
      firstname,
      questionTitle,
      questionText,
      createAT,
    };

    // Update acknowledgments state
    setAcknowledgments([...acknowledgments, newAcknowledgment]);
    setSignature("");
    setAcknowledgementData([...acknowledgementData, processID]);
    const updatedAck = [...acknowledgments, newAcknowledgment];
    // Update LocalStorage after acknowledgment
    localStorage.setItem("change_acknowledgements", JSON.stringify(updatedAck));
  };

  const getUnacknowledgedQuestions = () => {
    const acknowledgedQuestions = acknowledgementData.filter(
      (ack) => ack.userID === data.userID
    );

    return questions.filter((question) => {
      const acknowledged = acknowledgedQuestions.some(
        (ack) => ack.processID === question.processID
      );

      const isRoleMatch =
        (question.role === "All" || question.role === data.role) &&
        (question.siteLocation === "All" ||
          question.siteLocation === siteLocation);

      if (question.questionType === "Repeated") {
        return isRoleMatch;
      }

      return !acknowledged && isRoleMatch;
    });
  };

  const unacknowledgedQuestions = getUnacknowledgedQuestions(data.userID);

  const allQuestionsAcknowledged =
    unacknowledgedQuestions.filter(
      (q) => !acknowledgementData.includes(q.processID)
    ).length === 0;

  if (allQuestionsAcknowledged) {
    return <DurationClock data={data} siteLocation={siteLocation} />;
  }

  if (siteLocation) {
    return (
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl sticky top-0 bg-white py-4 z-10">
            Process Change Acknowledgements
          </h2>
          <div className="max-h-screen overflow-y-auto mt-4">
            {unacknowledgedQuestions.map((question) => (
              <div key={question.processID} className="flow-root mt-5 sm:mt-5">
                <div className="divide-y divide-gray-200 -my-9">
                  {!acknowledgementData.includes(question.processID) && (
                    <div className="py-9">
                      {/* <p className="text-xl font-semibold text-black">
                        Date of Change {question.createAT}
                      </p> */}
                      <p className="mt-3 text-base text-gray-600">
                        {question.text}
                      </p>
                      {question.comments === "Yes" && (
                        <div className="mt-4">
                          <input
                            type="text"
                            className="border border-gray-300 px-3 py-2 rounded-md"
                            placeholder="MM/YYYY"
                            value={question.commentValue || ""}
                            onChange={(e) => {
                              // Handle input change
                              const updatedQuestions = questions.map((q) =>
                                q.processID === question.processID
                                  ? { ...q, commentValue: e.target.value }
                                  : q
                              );
                              setQuestions(updatedQuestions);
                            }}
                          />
                        </div>
                      )}
                      <div className="flex items-center mt-5">
                        <button
                          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                          onClick={() =>
                            acknowledgeQuestion(
                              data.userID,
                              question.processID,
                              data.firstname,
                              question.title,
                              data.lastname,
                              question.text,
                              dateFormat()
                            )
                          }
                        >
                          Acknowledge
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
};

export default UserAcknowledgementForm;
