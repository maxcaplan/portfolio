/**
 * Adds a leading zero to positive input number if it has less than 2 digits
 * @param num - The number to add the leading zeros to
 */
export const addLeadingZeros = (num: number): string => {
	return `${Math.abs(num) < 10 ? "0" : ""}${Math.abs(num)}`;
};
