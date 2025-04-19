export type RootStackParamList = {
  Home: undefined;
  Tutorial: undefined;
  GameLevels: undefined;
  GamePlay: {
    levelId: string;
    levelTitle: string;
  };
  Reference: undefined;
  K1Guide: undefined;
  K1Details: {
    boxId: string;
  };
  TaxCalculator: undefined;
  Quiz: {
    quizId: string;
    quizTitle: string;
  };
  QuizResults: {
    score: number;
    totalQuestions: number;
    quizId: string;
  };
  Progress: undefined;
  BasisWorksheet: undefined;
  TaxCases: undefined;
  CaseDetail: {
    caseId: string;
  };
};