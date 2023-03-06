export type OptionsType = {
  where?: Object;
  limit?: number;
  offset?: number;
};
export const generateOptionsQuery = (options: OptionsType) => {
  let str = "";
  if (options.where) {
    str+="WHERE "
    let whereKeys = Object.keys(options.where);
    whereKeys.map((item) => {
      // @ts-ignore
      str += `${item} = '${options.where[item]}' `;
    });
  }
  if (options.limit) {
    str += `LIMIT ${options.limit} `;
  }
  if (options.offset) {
    str += `OFFSET ${options.offset} `;
  }
  return str;
};
