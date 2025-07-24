export const storageIdPKey = 'registeredCourses';
export function addCourseIdToLocalStorage(courseId) {
  if (!courseId) return;
  let registeredCourses = JSON.parse(localStorage.getItem(storageIdPKey)) || [];
  if (!registeredCourses.includes(courseId)) {
    registeredCourses.push(courseId);
    localStorage.setItem(storageIdPKey, JSON.stringify(registeredCourses));
  }
}

export function checkIdProgram(courseId) {
  if (!courseId) return false;
  let registeredCourses = JSON.parse(localStorage.getItem(storageIdPKey)) || [];
  if (registeredCourses.includes(courseId)) return true;

  return false;
}


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function getInitials(name) {
  const words = name.split(' ');
  // Get the first character of the first two words
  const initials = words.slice(0, 2).map(word => word.charAt(0)).join('');
  return initials.toUpperCase(); // Return initials in uppercase
}

export function stringAvatar(name, sz = 64, mr = 2) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: sz, height: sz, mr: mr
    },
    children: getInitials(name),
  };
}

export const formatRupiah = (number) => {
  const roundedNumber = Math.round(number);
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundedNumber);
}

export function addDotSeparator(input) {
  // Convert input to string
  const str = input.toString();
  // Remove any existing non-digit characters (optional)
  const digitsOnly = str.replace(/\D/g, '');
  // Insert dot every 3 digits from the right
  return digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Format a number with - separators
export const formatTel = (num) => {
  if (num === null) return '';
  return num.toString().replace(/\B(?=(\d{4})+(?!\d))/g, '-');
};

// String format
export const formatBintang = (string, num=10) => {
  if (string === null) return '';
  const str = string.slice(0, 14);
  return `${str}***`;
};