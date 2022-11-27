import {
  formatDistance,
  parseISO,
  isValid,
  isToday,
  format,
} from 'date-fns';
import { id } from 'date-fns/locale';
import Jsona from 'jsona';
import {
  snakeCase,
  camelCase,
  pick,
} from 'lodash';
import * as moment from 'moment';

/**
 * Helpers
 * ===
 * ### Important Log
 * Necessary log if you really want to use logger in develop environment
 * @param {*} message - Anything that want to show in console browser / terminal
 */
export const log = process.env.NODE_ENV === 'production'
  ? () => { }
  // eslint-disable-next-line no-console
  : console.log.bind(console);

/**
 * Helpers
 * ===
 * ### Check Empty
 * Check emptyness of an object, array, string or even undefiend data type.
 * @param {Any} data
 */
export function isEmpty(data) {
  let result = false;

  if (typeof (data) === 'object') {
    if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') result = true;
    if (!data) result = true;
  } else if (typeof (data) === 'string') {
    if (!data.trim()) result = true;
  } else if (typeof (data) === 'undefined') {
    result = true;
  }

  return result;
}

// ------------------ Date and Time ------------------
/**
 * Helpers
 * ===
 * ### Get only formatted date from raw date
 * Using date-fns as third party to reformat for display purposes.
 *
 * Raw date will be convert to 'dd MMMM yyyy'
 * @param {Date} date - Date format that accepted in date-fns
 */
export const getDate = (date) => {
  if (!isValid(parseISO(date))) return '-';
  return format(new Date(date), 'dd MMMM yyyy', { locale: id });
};

/**
 * Helpers
 * ===
 * ### Get only formatted full date + time from raw date
 * Using date-fns as third party to reformat for display purposes.
 *
 * Raw date will be convert to 'dd MMMM yyyy, HH:mm'
 * @param {Date} date - Date format that accepted in date-fns
 */
export const getDateTime = (date) => {
  if (!isValid(parseISO(date))) return '-';
  return format(new Date(date), 'dd MMMM yyyy, kk:mm', { locale: id });
};

/**
 * Helpers
 * ===
 * ### Get only formatted full date that follow international standard (YYYY-MM-DD)
 * Using date-fns as third party to reformat for display purposes.
 *
 * Raw date will be convert to 'yyyy-mm-dd'
 * @param {Date} date - Date format that accepted in date-fns
 */
export const getDateInterStandard = (date) => {
  if (!isValid(parseISO(date))) return '-';
  return format(new Date(date), 'yyyy-MM-dd', { locale: id });
};

/**
 * Helpers
 * ===
 * ### Get only formatted short date + time from raw date
 * Using date-fns as third party to reformat for display purposes.
 *
 * Raw date will be convert to 'dd MMM yyyy, HH:mm'
 * @param {Date} date - Date format that accepted in date-fns
 */
export const getShortDateTime = (date) => {
  if (!isValid(parseISO(date))) return '-';
  return format(new Date(date), 'dd MMM yyyy, kk:mm', { locale: id });
};

/**
 * Helpers
 * ===
 * ### Get only formatted full date or today + time from raw date
 * Using date-fns as third party to reformat for display purposes.
 *
 * Raw date will be convert to 'dd MMMM yyyy, HH:mm'
 * If checkToday TRUE, Raw dte will be convert to 'Today - HH:mm'
 * @param {Date} date - Date format that accepted in date-fns
 */
export const getDateTimeToday = (date) => {
  if (!isValid(parseISO(date))) return '-';
  const today = isToday(new Date(date));
  const formatted = format(new Date(date), today ? 'kk:mm' : 'dd MMMM yyyy, kk:mm', { locale: id });
  if (today) return `Today, ${formatted}`;
  return formatted;
};

/**
 * Helpers
 * ===
 * ### Get only formatted full date + time from raw date for file name
 * Using date-fns as third party to reformat for display purposes.
 *
 * Raw date will be convert to 'ddMMyyyy'
 * @param {Date} date - Date format that accepted in date-fns
 */
export const getDateFile = (date) => {
  if (!isValid(parseISO(date))) return '-';
  return format(new Date(date), 'ddMMyyyy', { locale: id });
};

/**
 * Helpers
 * ===
 * ### Get only formatted full date or today + time from raw date
 * Using date-fns as third party to reformat for display purposes.
 *
 * Raw date will be convert to 'dd MMMM yyyy, HH:mm'
 * If checkToday TRUE, Raw dte will be convert to 'Today - HH:mm'
 * @param {Date} date - Date format that accepted in date-fns
 */
export const getDateToday = (date) => {
  if (!isValid(parseISO(date))) return '-';
  const today = isToday(new Date(date));
  const formatted = format(new Date(date), 'dd MMMM yyyy', { locale: id });
  if (today) return 'Today';
  return formatted;
};

/**
 * Helpers
 * ===
 * ### Get only formatted time from raw date
 * Using date-fns as third party to reformat for display purposes.
 *
 * Raw date will be convert to 'HH:mm'
 * @param {Date} date - Date format that accepted in date-fns
 */
export const getTime = (date) => {
  if (!isValid(parseISO(date))) return '-';
  return format(new Date(date), 'kk:mm', { locale: id });
};

/**
 * Helpers
 * ===
 * ### Get only hour and minute from formatted time
 *
 * Formatted time will be convert to 'HH:mm'
 * @param {Time} time - Time format 'HH:mm:ss'
 */
export const removeSecond = (formattedTime) => {
  if (!formattedTime) return '-';
  return formattedTime.substring(0, formattedTime.length - 3);
};

export const timeDuration = (dateToCompare, date) => {
  if (!isValid(parseISO(dateToCompare)) || !isValid(parseISO(date))) return '-';
  return formatDistance(new Date(dateToCompare), new Date(date),
    { includeSeconds: true, locale: id });
};
// ------------------ end of Date and Time ------------------

// ------------------ Vuex and JSONAPI helpers ------------------
/**
 * Helpers
 * ===
 * ### Remap Property key
 * Remap The Object Property to `SET_[property]` (PASCAL ALL CAPS) for to be used on mutations
 *
 * @param {Object} state - The state to remapped
 * @param {Array} string - Selected Array of String state name want to remap
 */
export function mapMutationsHelper(stateObj, selected) {
  const ret = selected ? pick(stateObj, selected) : stateObj;
  // eslint-disable-next-line array-callback-return
  Object.keys(ret).map((key) => {
    ret[`SET_${snakeCase(key)}`.toUpperCase()] = (state, payload) => {
      state[key] = payload;
    };
    delete ret[key];
  });
  return ret;
}

/**
 * Helpers
 * ===
 * ### Remap Property key
 * Remap The Object Property to `set[property]` (camelCase) for to be used on getters
 *
 * @param {Object} state - The state to remapped
 * @param {Array} string - Selected Array of String state name want to remap
 */
export const mapGettersHelper = (stateObj, selected) => {
  const ret = selected ? pick(stateObj, selected) : stateObj;
  // eslint-disable-next-line array-callback-return
  Object.keys(ret).map((key) => {
    ret[camelCase(`get ${key}`)] = (state) => state[key];
    delete ret[key];
  });
  return ret;
};

/**
 * Helpers
 * ===
 * ### Deserialize
 * Deserialize json object using JSONA, prevent dev using undefined scema.
 *
 * more info about this: https://github.com/olosegres/jsona
 *
 * @param {Json} data - Raw JSON format that accepted in jsona
 */
export const deserialize = (data) => {
  const formater = new Jsona();
  return formater.deserialize(data);
};
// ------------------ End of Vuex and JSONAPI helpers ------------------

// ------------------ Others ------------------
/**
 * Utilities
 * ===
 * ### Accept Only Number on keypress
 * Prevent user to input other than number
 * @param {Event} evt - Event input
 */
export const onlyNumberOnKeypress = (evt) => {
  const charCode = (evt.which) ? evt.which : evt.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault();
  }
  return true;
};

/**
 * Helpers
 * ===
 * ### Convert Number or String to String
 * Converting Number or String to String
 * @param {Number|String} value - Value that need to be converted
 */
export const stringifyValue = (value) => {
  if (!value) return '';
  return value.toString();
};

/**
 * Helpers
 * ===
 * ### Capitalize
 * Capitalize First Char String
 * @param {Number|String} value - Value that need to be converted
 */
export const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Helpers
 * ===
 * ### Convert String to Slug
 * Converting String to Slug
 * @param {String} text - Value that need to be converted
 */
export const slugify = (text) => text.toString().toLowerCase()
  .replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w\\-]+/g, '') // Remove all non-word chars
  .replace(/\\-\\-+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, ''); // Trim - from end of text

/**
 * Helpers
 * ===
 * ### Encode Query Param
 * Convert object with keys to query params
 * @param {Object} data - Data object that want to converted to query param string
 */
export const encodeQueryData = (data) => {
  const res = [];
  const keys = Object.keys(data).map((key) => key);
  keys.forEach((d) => {
    if (d && !isEmpty(data[d])) {
      res.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`);
    }
  });

  return res.join('&');
};

/**
 * Helpers
 * ===
 * ### Mapping Currency
 * Mapping currency for display purposes.
 *
 * e.g. Rupiah: Rp. 50.000 => { preifx: 'Rp', separator: '.' }
 * @param {String|Number} value - Value to be converted
 * @param {Object} cfg - Configuration accept: { prefix, separator }
 */
export const mappingCurrency = (value, cfg) => {
  if (!!value || value === 0) {
    const num = parseInt(value, 10);
    const res = num
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${(cfg && cfg.separator) || '.'}`)
      .toString();

    return (cfg && cfg.prefix ? `${cfg.prefix} ` : 'Rp ') + res;
  }

  return '';
};

/**
 * Helpers
 * ===
 * ### Reverse Currency to String
 * Mapping currency to string for submitting to API.
 *
 * e.g. Rupiah: 50.000 => { preifx: 'Rp', separator: '.' }
 * @param {String|Number} value - Value to be converted
 */
export const reverseCurrency = (value) => {
  if (!!value || value === '') {
    const res = parseInt(value.replace(/,.*|[^0-9]/g, ''), 10);
    return res;
  }

  return 0;
};

/**
 * Helpers
 * ===
 * ### Remove Underscore
 * Remove Underscore from string for display purposes.
 *
 * CLINICAL_PROGRAM
 * @param {String|Number} value - Value to be converted
 */
export const removeUnderscore = (value) => value.replace('_', ' ');

/**
 * Helpers
 * ===
 * ### Format Date
 * Format DateTime from DB to readable date.
 *
 * @param {Date} value - Value to be formated
 * @returns {String}
 */
export const formatDate = (value) => moment(value).format('DD MMMM YYYY');

/**
 * Helpers
 * ===
 * ### Format Time
 * Format DateTime from DB to readable date.
 *
 * @param {Date} value - Value to be formated
 * @returns {String}
 */
export const formatDateToTime = (value) => moment(value).format('HH:mm');

/**
 * Helpers
 * ===
 * ### Format Time
 * Format Time from DB to readable date.
 *
 * @param {Date} value - Value to be formated
 * @returns {String}
 */
export const formatTime = (value) => moment(value, 'HH:mm:ss').format('HH:mm');

/**
 * Helpers
 * ===
 * ### Get File Url
 * Destruct and get extension and file url from a single file.
 *
 * @param {File} file - Any file
 */
export const fileToUrl = (file) => {
  if (!file) return null;
  const fileNameExt = [...file.name.split('.')].pop();
  return {
    ext: fileNameExt,
    // eslint-disable-next-line no-undef
    url: (window?.URL || webkitURL).createObjectURL(file),
  };
};

/**
 * Helpers
 * ===
 * ### Download Single Blob File
 * Create a link and download blob file from API.
 *
 * @param {Object} res - Response object from API
 * @param {String} filename - Filename with extension, it will be only file without any extension
 */
export const downloadBlob = (res, filename) => {
  if (!res) return;
  const blobData = [res.data];
  const blob = new Blob(blobData, { type: 'application/octet-stream' });
  const link = document.createElement('a');
  // eslint-disable-next-line no-undef
  link.href = (window?.URL || webkitURL).createObjectURL(blob);
  link.setAttribute('download', filename || 'file');
  document.body.appendChild(link);
  link.click();
};
