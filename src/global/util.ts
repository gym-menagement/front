/**
 * Validation utility functions and regex patterns
 */

// ===========================
// Regex Patterns
// ===========================

/**
 * 아이디 정규식
 * - 영문자로 시작
 * - 영문자, 숫자, 언더스코어(_) 사용 가능
 * - 4~20자
 */
export const REGEX_LOGINID = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/;

/**
 * 비밀번호 정규식
 * - 영문자, 숫자, 특수문자 중 2가지 이상 조합
 * - 8~20자
 */
export const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/;

/**
 * 이메일 정규식
 * - 표준 이메일 형식
 */
export const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * 전화번호 정규식
 * - 하이픈 포함: 010-1234-5678, 02-123-4567, 031-123-4567
 * - 하이픈 미포함: 01012345678, 0212345678, 03112345678
 */
export const REGEX_PHONE_WITH_HYPHEN = /^0\d{1,2}-\d{3,4}-\d{4}$/;
export const REGEX_PHONE_WITHOUT_HYPHEN = /^0\d{9,10}$/;
export const REGEX_PHONE = /^(0\d{1,2}-\d{3,4}-\d{4}|0\d{9,10})$/;

/**
 * 휴대폰 번호 정규식 (010, 011, 016, 017, 018, 019)
 * - 하이픈 포함: 010-1234-5678
 */
export const REGEX_MOBILE = /^01[0-9]-\d{3,4}-\d{4}$/;
export const REGEX_MOBILE_WITHOUT_HYPHEN = /^01[0-9]\d{7,8}$/;

/**
 * 이름 정규식
 * - 한글, 영문자만 허용
 * - 2~20자
 */
export const REGEX_NAME_KOR = /^[가-힣]{2,20}$/;
export const REGEX_NAME_ENG = /^[a-zA-Z\s]{2,50}$/;
export const REGEX_NAME = /^[가-힣a-zA-Z\s]{2,50}$/;

/**
 * 생년월일 정규식
 * - YYYY-MM-DD 형식
 */
export const REGEX_BIRTH_DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

/**
 * 우편번호 정규식
 * - 5자리 또는 6자리 (구 우편번호)
 */
export const REGEX_ZIPCODE = /^\d{5,6}$/;

/**
 * 숫자만 허용
 */
export const REGEX_ONLY_NUMBER = /^\d+$/;

/**
 * 영문자만 허용
 */
export const REGEX_ONLY_ALPHABET = /^[a-zA-Z]+$/;

/**
 * 한글만 허용
 */
export const REGEX_ONLY_KOREAN = /^[가-힣]+$/;

// ===========================
// Validation Functions
// ===========================

/**
 * 아이디 검증
 */
export const validateLoginId = (loginid: string): { valid: boolean; message?: string } => {
  if (!loginid) {
    return { valid: false, message: '아이디를 입력해주세요.' };
  }
  if (loginid.length < 4) {
    return { valid: false, message: '아이디는 4자 이상이어야 합니다.' };
  }
  if (loginid.length > 20) {
    return { valid: false, message: '아이디는 20자 이하여야 합니다.' };
  }
  if (!REGEX_LOGINID.test(loginid)) {
    return {
      valid: false,
      message: '아이디는 영문자로 시작하며, 영문자, 숫자, 언더스코어(_)만 사용 가능합니다.',
    };
  }
  return { valid: true };
};

/**
 * 비밀번호 검증
 */
export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (!password) {
    return { valid: false, message: '비밀번호를 입력해주세요.' };
  }
  if (password.length < 8) {
    return { valid: false, message: '비밀번호는 8자 이상이어야 합니다.' };
  }
  if (password.length > 20) {
    return { valid: false, message: '비밀번호는 20자 이하여야 합니다.' };
  }
  if (!REGEX_PASSWORD.test(password)) {
    return {
      valid: false,
      message: '비밀번호는 영문자, 숫자, 특수문자 중 2가지 이상 조합해야 합니다.',
    };
  }
  return { valid: true };
};

/**
 * 비밀번호 확인 검증
 */
export const validatePasswordConfirm = (
  password: string,
  confirmPassword: string
): { valid: boolean; message?: string } => {
  if (!confirmPassword) {
    return { valid: false, message: '비밀번호 확인을 입력해주세요.' };
  }
  if (password !== confirmPassword) {
    return { valid: false, message: '비밀번호가 일치하지 않습니다.' };
  }
  return { valid: true };
};

/**
 * 이메일 검증
 */
export const validateEmail = (email: string): { valid: boolean; message?: string } => {
  if (!email) {
    return { valid: false, message: '이메일을 입력해주세요.' };
  }
  if (!REGEX_EMAIL.test(email)) {
    return { valid: false, message: '올바른 이메일 형식이 아닙니다.' };
  }
  return { valid: true };
};

/**
 * 전화번호 검증
 */
export const validatePhone = (phone: string): { valid: boolean; message?: string } => {
  if (!phone) {
    return { valid: false, message: '전화번호를 입력해주세요.' };
  }
  if (!REGEX_PHONE.test(phone)) {
    return {
      valid: false,
      message: '전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)',
    };
  }
  return { valid: true };
};

/**
 * 휴대폰 번호 검증
 */
export const validateMobile = (mobile: string): { valid: boolean; message?: string } => {
  if (!mobile) {
    return { valid: false, message: '휴대폰 번호를 입력해주세요.' };
  }
  if (!REGEX_MOBILE.test(mobile) && !REGEX_MOBILE_WITHOUT_HYPHEN.test(mobile)) {
    return {
      valid: false,
      message: '휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)',
    };
  }
  return { valid: true };
};

/**
 * 이름 검증
 */
export const validateName = (name: string): { valid: boolean; message?: string } => {
  if (!name) {
    return { valid: false, message: '이름을 입력해주세요.' };
  }
  if (name.length < 2) {
    return { valid: false, message: '이름은 2자 이상이어야 합니다.' };
  }
  if (name.length > 50) {
    return { valid: false, message: '이름은 50자 이하여야 합니다.' };
  }
  if (!REGEX_NAME.test(name)) {
    return { valid: false, message: '이름은 한글 또는 영문자만 입력 가능합니다.' };
  }
  return { valid: true };
};

/**
 * 생년월일 검증
 */
export const validateBirthDate = (birthDate: string): { valid: boolean; message?: string } => {
  if (!birthDate) {
    return { valid: false, message: '생년월일을 입력해주세요.' };
  }
  if (!REGEX_BIRTH_DATE.test(birthDate)) {
    return { valid: false, message: '생년월일 형식이 올바르지 않습니다. (YYYY-MM-DD)' };
  }

  // 날짜 유효성 검증
  const date = new Date(birthDate);
  if (isNaN(date.getTime())) {
    return { valid: false, message: '유효하지 않은 날짜입니다.' };
  }

  // 미래 날짜 검증
  if (date > new Date()) {
    return { valid: false, message: '미래 날짜는 입력할 수 없습니다.' };
  }

  // 너무 과거 날짜 검증 (100년 전)
  const hundredYearsAgo = new Date();
  hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100);
  if (date < hundredYearsAgo) {
    return { valid: false, message: '유효하지 않은 생년월일입니다.' };
  }

  return { valid: true };
};

// ===========================
// Format Functions
// ===========================

/**
 * 전화번호 포맷팅 (하이픈 추가)
 * 01012345678 -> 010-1234-5678
 */
export const formatPhoneNumber = (phone: string): string => {
  const numbers = phone.replace(/[^0-9]/g, '');

  if (numbers.length === 11) {
    // 010-1234-5678
    return numbers.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (numbers.length === 10) {
    // 02-1234-5678 또는 031-123-4567
    if (numbers.startsWith('02')) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    } else {
      return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
  } else if (numbers.length === 9) {
    // 02-123-4567
    return numbers.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  return phone;
};

/**
 * 전화번호에서 하이픈 제거
 * 010-1234-5678 -> 01012345678
 */
export const removePhoneHyphen = (phone: string): string => {
  return phone.replace(/[^0-9]/g, '');
};

/**
 * 생년월일 포맷팅
 * 20000101 -> 2000-01-01
 */
export const formatBirthDate = (birthDate: string): string => {
  const numbers = birthDate.replace(/[^0-9]/g, '');

  if (numbers.length === 8) {
    return numbers.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
  }

  return birthDate;
};

/**
 * 숫자만 추출
 */
export const extractNumbers = (str: string): string => {
  return str.replace(/[^0-9]/g, '');
};

/**
 * 영문자만 추출
 */
export const extractAlphabet = (str: string): string => {
  return str.replace(/[^a-zA-Z]/g, '');
};

/**
 * 한글만 추출
 */
export const extractKorean = (str: string): string => {
  return str.replace(/[^가-힣]/g, '');
};
