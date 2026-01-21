export interface FormContentProps {
  formik: any;
  error: string | null;
  showPwd: boolean;
  showConfirm: boolean;
  setShowPwd: (v: boolean) => void;
  setShowConfirm: (v: boolean) => void;
}

export interface PasswordFieldsProps {
  formik: any;
  showPwd: boolean;
  showConfirm: boolean;
  setShowPwd: (v: boolean) => void;
  setShowConfirm: (v: boolean) => void;
}
