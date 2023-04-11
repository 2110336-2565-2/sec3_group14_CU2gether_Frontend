import { Organizer, Student } from "@/types";
import { create } from "zustand";
import userProfile from "api/user-profile";
import { ROLE } from "@/types";
import student from "api/student";
import organizer from "api/organizer";
import FormData from "form-data";

type ProfileStore = {
  id?: string;
  name?: string;
  role?: ROLE;
  email?: string;
  imageUrl?: string;
  credits: number;
  student: Student;
  organizer: Organizer;
  checkStatus: () => void;
  checkStatusById: (id: string) => void;
  getRoleById: (id: string) => Promise<any>;
  getProfile: (id: string, role: ROLE) => void;
  updateProfile: (id: string, role: ROLE, params: any) => void;
  resetPassword: (id: string, role: ROLE, params: any) => void;
  uploadImage: (params: FormData) => void;
  uploadCoverImage: (params: FormData) => void;
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
  credits: 0
};

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
  credits: 0
};

const useProfileStore = create<ProfileStore>((set, get) => ({
  student: studentProfile,
  organizer: organizerProfile,
  credits: 0,
  checkStatus: () => {
    userProfile
      .checkStatus()
      .then((data: any) => {
        if (!data) {
          set({
            id: undefined,
            name: undefined,
            role: undefined,
            email: undefined,
            imageUrl: undefined
          });
          return;
        }
        const { id, role, name, email, imageUrl, credits } = data;
        set({ id, role, name, email, imageUrl, credits });
      })
      .catch((err: any) => console.log(err));
  },
  checkStatusById: (id: string) => {
    userProfile
      .checkStatusById(id)
      .then((data: any) => {
        if (!data) return;
        const { id, role, name, email, imageUrl } = data;
        set({ id, role, name, email, imageUrl });
      })
      .catch((err: any) => console.log(err));
  },
  getRoleById: async (id: string): Promise<any> => {
    const r = await userProfile.checkStatusById(id);
    return r.role;
  },
  getProfile: (id: string, role: ROLE) => {
    switch (role) {
      case ROLE.STUDENT:
        student.getStudentById(id).then((res: any) => set({ student: res }));
        break;
      case ROLE.ORGANIZER:
        organizer
          .getOrganizerById(id)
          .then((res: any) => set({ organizer: res }));
        break;
    }
  },
  updateProfile: async (id: string, role: ROLE, params: any) => {
    switch (role) {
      case ROLE.STUDENT:
        await student
          .updateStudentById(id, params)
          .then((res: any) => set({ student: res }));
        break;
      case ROLE.ORGANIZER:
        await organizer
          .updateOrganizerById(id, params)
          .then((res: any) => set({ organizer: res }));
        break;
    }
  },
  resetPassword: async (id: string, role: ROLE, params: any) => {
    switch (role) {
      case ROLE.STUDENT:
        await student
          .resetStudentPasswordById(id, params)
          .then((res: any) => set({ student: res }));
        break;
      case ROLE.ORGANIZER:
        await organizer
          .resetOrganizerPasswordById(id, params)
          .then((res: any) => set({ organizer: res }));
        break;
    }
  },
  uploadImage: (params: FormData) => {
    userProfile.uploadImage(params);
  },
  uploadCoverImage: (params: FormData) => {
    userProfile.uploadCoverImage(params);
  },
}));

export default useProfileStore;
