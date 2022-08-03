import fs from 'fs';
import path from 'path';

export const getKeys = () => {
  let keys: any = [];
  try {
    const content = fs.readFileSync(path.join(process.cwd(), 'sample', 'keys.txt'), 'utf8');
    const contentSplitted = content.split(/\r?\n/).filter((element: any) => element);
    contentSplitted.forEach((k: any) => {
      const [key, replace] = k.split(" | ")
      keys.push({ name: key })
    })
    return keys;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const generateReplacedFile = (data: any, keys: any) => {
  let newData = data;

  Object.keys(keys).forEach((key: any) => {
    newData = newData.replaceAll(key, keys[key])
  })
  return newData;
}
