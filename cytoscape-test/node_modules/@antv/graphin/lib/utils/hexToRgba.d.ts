/**
 * Turns an old-fashioned css hex color value into a rgb color value.
 *
 * If you specify an alpha value, you'll get a rgba() value instead.
 *
 * @param The hex value to convert. ('123456'. '#123456', ''123', '#123')
 * @param An alpha value to apply. (optional) ('0.5', '0.25')
 * @return An rgb or rgba value. ('rgb(11, 22, 33)'. 'rgba(11, 22, 33, 0.5)')
 */
declare const hexToRgba: (hex: string, a?: string | undefined) => string;
/**
 *
 * @param hex
 * @param a 透明度，默认是1
 * @returns hex string
 */
export declare const hexToRgbaToHex: (hex: string, a?: string | number) => string;
export default hexToRgba;
