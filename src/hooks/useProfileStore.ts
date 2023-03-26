import { Organizer, Student } from "@/types";
import { create } from "zustand";
import userProfile from "api/user-profile";
import { ROLE } from "@/utils/Enum";
import student from "api/student";
import organizer from "api/organizer";

type ProfileStore = {
  name?: string;
  role?: ROLE;
  email?: string;
  imageUrl?: string;
  student: Student;
  organizer: Organizer;
  checkStatus: () => void;
  getProfile: (id: string, role: ROLE) => void;
  updateProfile: (id: string, role: ROLE, params: any) => void;
  resetPassword: (id: string, role: ROLE, params: any) => void;
};

const studentProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "John@Doe.com",
  studentId: "0000000000",
  password: "12345678",
  cardId: "card",
  imageUrl: "",
  coverImageUrl: "",
  description: "",
  cancelTimes: 1,
  createTimes: 2,
  joinTimes: 3,
  unjoinTimes: 4,
  role: ROLE.STUDENT,
}

const organizerProfile = {
  email: "Jane@Doe.com",
  name: "Jane",
  coorName: "Doe",
  phone: "021231234",
  description: "awful",
  password: "12344356",
  createTimes: 0,
  cancelTimes: 0,
  imageUrl: "",
  coverImageUrl: "",
  role: ROLE.ORGANIZER,
}

const useProfileStore = create<ProfileStore>((set, get) => ({
  student: studentProfile,
  organizer: organizerProfile,
  checkStatus: () => {
    userProfile
      .checkStatus()
      .then((data: any) => {
        if (!data) return;
        const { role, name, email, imageUrl } = data;
        set({ role, name, email, imageUrl });
      })
      .catch((err: any) => console.log(err));
  },
  getProfile: (id: string, role: ROLE) => {
    switch (role) {
      case ROLE.STUDENT:
        student.getStudentById(id).then((res: any) => set({ student: res }));
        break;   
      case ROLE.ORGANIZER:
        organizer.getOrganizerById(id).then((res: any) => set({ organizer: res }));
        break;
    }
  },
  updateProfile: (id: string, role: ROLE, params: any) => {
    switch (role) {
      case ROLE.STUDENT:
        student.updateStudentById(id, params).then((res: any) => set({ student: res }));
        break;   
      case ROLE.ORGANIZER:
        organizer.updateOrganizerById(id, params).then((res: any) => set({ organizer: res }));
        break;
    }
  },
  resetPassword: (id: string, role: ROLE, params: any) => {
    switch (role) {
      case ROLE.STUDENT:
        student.resetStudentPasswordById(id, params).then((res: any) => set({ student: res }));
        break;   
      case ROLE.ORGANIZER:
        organizer.resetOrganizerPasswordById(id, params).then((res: any) => set({ organizer: res }));
        break;
    }
  }
}));

export default useProfileStore;
