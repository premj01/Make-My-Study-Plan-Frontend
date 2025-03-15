import { createContext, useState } from "react";

const StudyPlanContext = createContext();

const StudyPlanContextProvider = ({ children }) => {
  const [studyPlan, setStudyPlan] = useState([]);
  const [studyPlanId, setStudyPlanId] = useState();

  return (
    <StudyPlanContext.Provider
      value={{ studyPlan, setStudyPlan, studyPlanId, setStudyPlanId }}
    >
      {children}
    </StudyPlanContext.Provider>
  );
};

export default StudyPlanContext;
export { StudyPlanContextProvider };
