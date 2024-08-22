import React, { useState, useEffect } from "react";

import dateFormat from "../../utils/dateFormat";
import AskProcessChange from "../forms/AskProcessChange";

const UserAcknowledgementForm = ({ data, siteLocation }) => {
  const [questions, setQuestions] = useState([]);
  const [acknowledgments, setAcknowledgments] = useState([]);
  const [signature, setSignature] = useState("");
  const [acknowledgementData, setAcknowledgementData] = useState([]);
  const [declineReason, setDeclineReason] = useState({});
  const [showReasonInput, setShowReasonInput] = useState({});

  useEffect(() => {
    // Fetch data from LocalStorage
    try {
      const ack_data = localStorage.getItem("acknowledgements");
      const question_data = localStorage.getItem("safety_questions");

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
    questionID,
    firstname,
    questionTitle,
    lastname,
    questionText,
    createAT,
    commentValue
  ) => {
    const newAcknowledgment = {
      userID,
      questionID,
      lastname,
      dateFormat,
      siteLocation,
      firstname,
      questionTitle,
      questionText,
      createAT,
      commentValue,
      acknowledgment: "Accepted",
    };

    // Update acknowledgments state
    setAcknowledgments([...acknowledgments, newAcknowledgment]);
    setSignature("");
    setAcknowledgementData([...acknowledgementData, questionID]);
    const updatedAck = [...acknowledgments, newAcknowledgment];
    localStorage.setItem("acknowledgements", JSON.stringify(updatedAck));
  };

  const declineQuestion = (
    userID,
    questionID,
    firstname,
    questionTitle,
    lastname,
    questionText,
    createAT,
    reason
  ) => {
    const newDecline = {
      userID,
      questionID,
      lastname,
      dateFormat,
      siteLocation,
      firstname,
      questionTitle,
      questionText,
      createAT,
      reason,
      acknowledgment: "Declined",
    };

    // Handle decline logic here (store or log as needed)
    setAcknowledgments([...acknowledgments, newDecline]);
    setShowReasonInput({ ...showReasonInput, [questionID]: false });
    setAcknowledgementData([...acknowledgementData, questionID]);
    localStorage.setItem(
      "acknowledgements",
      JSON.stringify([...acknowledgments, newDecline])
    );
  };

  const getUnacknowledgedQuestions = () => {
    const acknowledgedQuestions = acknowledgments.filter(
      (ack) => ack.userID === data.userID
    );

    return questions.filter((question) => {
      const acknowledged = acknowledgedQuestions.some(
        (ack) => ack.questionID === question.questionID
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
      (q) => !acknowledgementData.includes(q.questionID)
    ).length === 0;

  if (allQuestionsAcknowledged) {
    return <AskProcessChange data={data} siteLocation={siteLocation} />;
  }

  if (siteLocation) {
    return (
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl sticky top-0 bg-white py-4 z-10">
            Safety Review Acknowledgements
          </h2>
          <div className="max-h-screen overflow-y-auto mt-4">
            {unacknowledgedQuestions.map((question) => (
              <div
                key={question.questionID}
                className="flow-root mt-12 sm:mt-16"
              >
                {!acknowledgementData.includes(question.questionID) && (
                  <div className="divide-y divide-gray-200 -my-9">
                    <div className="py-9">
                      <p className="mt-3 text-base text-gray-600">
                        {question.text}
                      </p>
                      {question.comments === "Yes" && (
                        <div className="mt-4">
                          <input
                            type="month"
                            dateFormat="MM/YYYY"
                            className="border border-gray-300 px-3 py-2 rounded-md"
                            placeholder="MM/YYYY"
                            value={question.commentValue || ""}
                            onChange={(e) => {
                              const updatedQuestions = questions.map((q) =>
                                q.questionID === question.questionID
                                  ? { ...q, commentValue: e.target.value }
                                  : q
                              );
                              setQuestions(updatedQuestions);
                            }}
                          />
                        </div>
                      )}
                      {!showReasonInput[question.questionID] && (
                        <div className="flex items-center mt-5 space-x-4">
                          <button
                            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                            onClick={() =>
                              acknowledgeQuestion(
                                data.userID,
                                question.questionID,
                                data.firstname,
                                question.title,
                                data.lastname,
                                question.text,
                                dateFormat(),
                                question.commentValue
                              )
                            }
                          >
                            Acknowledge
                          </button>

                          <button
                            className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                            onClick={() =>
                              setShowReasonInput({
                                ...showReasonInput,
                                [question.questionID]:
                                  !showReasonInput[question.questionID],
                              })
                            }
                          >
                            Decline
                          </button>
                        </div>
                      )}
                      {showReasonInput[question.questionID] && (
                        <div className="mt-4">
                          <textarea
                            className="border border-gray-300 px-3 py-2 rounded-md w-full"
                            placeholder="State the reason for declining"
                            value={declineReason[question.questionID] || ""}
                            onChange={(e) =>
                              setDeclineReason({
                                ...declineReason,
                                [question.questionID]: e.target.value,
                              })
                            }
                          />

                          {declineReason[question.questionID] && (
                            <button
                              className="mt-2 bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600"
                              onClick={() =>
                                declineQuestion(
                                  data.userID,
                                  question.questionID,
                                  data.firstname,
                                  question.title,
                                  data.lastname,
                                  question.text,
                                  dateFormat(),
                                  declineReason[question.questionID]
                                )
                              }
                            >
                              Submit Reason & Next
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
};

export default UserAcknowledgementForm;
