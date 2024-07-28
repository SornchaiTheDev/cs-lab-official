import { atom } from "jotai";

interface SubmissionAtom {
  selectedSubmissionId: string | null;
}

export const submissionAtom = atom<SubmissionAtom>({
  selectedSubmissionId: null,
});
