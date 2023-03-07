export type OptionsType = {
  where?: Object;
  limit?: number;
  offset?: number;
};
export const generateOptionsQuery = (options: OptionsType) => {
  let str = "";
  if (options.where) {
    str += "WHERE ";
    let whereKeys = Object.keys(options.where);
    whereKeys.map((item, index) => {
      if (index + 1 === whereKeys.length) {
        // @ts-ignore
        str += `${item} = '${options.where[item]}' `;
      }else{
         // @ts-ignore
         str += `${item} = '${options.where[item]}' AND `;
      }
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
