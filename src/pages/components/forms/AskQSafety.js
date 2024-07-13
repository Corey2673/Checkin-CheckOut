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
      const ack_data = localStorage.getItem("acknowledgements");
      const question_data = localStorage.getItem("safety_questions");

      if (ack_data) {
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
    createAT
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
    };

    // Update acknowledgments state
    setAcknowledgments([...acknowledgments, newAcknowledgment]);
    setSignature("");
    setAcknowledgementData([...acknowledgementData, questionID]);
    const updatedAck = [...acknowledgments, newAcknowledgment];
    // Update LocalStorage after acknowledgment
    localStorage.setItem("acknowledgements", JSON.stringify(updatedAck));
  };
  const getUnacknowledgedQuestions = () => {
    const acknowledgedQuestions = acknowledgementData.filter(
      (ack) => ack.userID === data.userID
    );

    return questions.filter((question) => {
      const acknowledged = acknowledgedQuestions.some(
        (ack) => ack.questionID === question.questionID
      );

      const isRoleMatch =
        question.role === data.role && question.siteLocation === siteLocation;

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
    return <DurationClock data={data} siteLocation={siteLocation} />;
  }

  if (siteLocation) {
    return (
      <section class="py-12 bg-white sm:py- lg:py-">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl mb-4 font-pj">
              Acknowledgments for {data.firstname} {data.lastname}
            </h2>
          </div>

          {unacknowledgedQuestions.map((question) => (
            <div
              key={question.questionID}
              className="grid max-w-lg grid-cols-3 gap-10 mx-auto md:max-w-4xl md:grid-cols-1 md:gap-x-16"
            >
              <div>
                {!acknowledgementData.includes(question.questionID) && (
                  <div className="space-y-10">
                    <div>
                      <blockquote className="py-6 bg-gray-100 rounded-2xl px-7">
                        <p className="text-lg font-normal leading-relaxed text-gray-900 font-pj">
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
                                  q.questionID === question.questionID
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
                                question.questionID,
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
                      </blockquote>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
};

export default UserAcknowledgementForm;
