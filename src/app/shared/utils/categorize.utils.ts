import { LOCALE } from "../constants/locale.constant";


/**
 * Categorizes an array of objects based on a specified property.
 * Each unique value of the property will form a key in the returned object,
 * and the corresponding value will be an array of objects that have that property value.
 *
 * @param {any[]} data - The array of objects to categorize.
 * @param {string} key - The property name to categorize the objects by.
 * @returns {Record<string, any[]>} An object where keys are unique values of the specified property,
 * and values are arrays of objects that have that property value.
 */

export const categorizeObjects = (data: any[], key: string) => {
  const categorized: any = {};

  for (const obj of data) {
    const categoryKey = obj[key];
    if (categorized[categoryKey]) {
      categorized[categoryKey].push(obj);
    } else {
      categorized[categoryKey] = [obj];
    }
  }
  return Object.values(categorized);
};

/**
 * Categorizes an array of voices based on the locale property.
 * Each unique value of the locale property will form a key in the returned object,

 * and the corresponding value will be an object with the locale info and an array of voices that have that locale.
 *
 * @param {any[]} data - The array of voices to categorize.
 * @returns {Record<string, { locale: string, voices: any[] }>} An object where keys are unique values of the locale property,
 * and values are objects with the locale info and an array of voices that have that locale.
 */
export const categorizeVoicesOnLocale = (data: any[]) => {
  const locale: any = LOCALE;
  const categorized: any = {};
  for (const obj of data) {
    const splitted: string[] = obj['language_code'].split('-');
    const categoryKey = `${splitted[0].toLowerCase()}-${splitted[1]?.toUpperCase() ?? language_country[splitted[0].toLowerCase()]}`;
    if (categorized[categoryKey]) {
      categorized[categoryKey].voices.push(obj);
    } else {
      categorized[categoryKey] = {
        ...locale[categoryKey],
        locale: categoryKey,
        voices: [obj],
      };
    }
  }
  return Object.values(categorized);
};

const language_country: any = {
  en: 'US',
  hi: 'IN',
  mr: 'IN',
  pa: 'IN',
  te: 'IN',
  bn: 'IN',
  ta: 'IN',
  gu: 'IN',
};
