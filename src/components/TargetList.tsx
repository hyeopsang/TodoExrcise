import React, { useContext } from 'react';
import { WorkoutContext } from '../libs/WorkoutProvider';
import "../styles/TargetList.css";

export default function TargetList() {
  const context = useContext(WorkoutContext);
  
  if (!context) {
    throw new Error("WorkOut must be used within a WorkoutProvider");
  }

  const { setTarget, isLoading } = context;

  const muscles = [
    { en: "abdominals", ko: "복근" },
    { en: "abductors", ko: "외전근" },
    { en: "adductors", ko: "내전근" },
    { en: "biceps", ko: "이두근" },
    { en: "calves", ko: "종아리" },
    { en: "chest", ko: "가슴" },
    { en: "forearms", ko: "전완근" },
    { en: "glutes", ko: "둔근" },
    { en: "hamstrings", ko: "햄스트링" },
    { en: "lats", ko: "광배근" },
    { en: "lower_back", ko: "허리 아래" },
    { en: "middle_back", ko: "허리 중간" },
    { en: "neck", ko: "목" },
    { en: "quadriceps", ko: "대퇴사두근" },
    { en: "traps", ko: "승모근" },
    { en: "triceps", ko: "삼두근" },
  ];

  const handleMuscleSelect = (event: string) => {
    setTarget(event);
  };


  return (
    <aside className='TargetList'>
      <h2>운동 부위 선택 <span>▼</span></h2>
      <ul>
        {muscles.map((muscle) => (
          <li key={muscle.en} value={muscle.en} onClick={()=> handleMuscleSelect(muscle.en)}>
            {muscle.ko}
          </li>
        ))}
      </ul>
    </aside>
  );
}
