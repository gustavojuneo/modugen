import fs from 'fs';
import path from 'path';
import { generateReplacedFile } from './generateFile';

const filesPath = path.join(process.cwd(), '/sample')
const outputName = 'tmp/teste'

const generate = (currentPath = filesPath, keys: any) => {
  fs.readdirSync(currentPath).forEach((file) => {
    const subpath = currentPath + '/' + file;
    if (fs.lstatSync(subpath).isDirectory()) {
      generate(subpath, keys);
    } else {
      fs.readFile(currentPath + '/' + file, 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const newFile = generateReplacedFile(data, keys);
        const directories = currentPath.split('/');
        const lastDirectory = directories[directories.length - 1];
        const outputPath = lastDirectory === 'sample' 
          ? path.join(currentPath.substring(0, currentPath.indexOf('sample')), outputName) 
          : currentPath.replace('sample', outputName);
        try {
          const outputNameSplitted = outputName.split('/');
          const outputRootPath = path.join(currentPath.substring(0, currentPath.indexOf('sample')));
          if (outputNameSplitted.length > 1 && lastDirectory === 'sample') {
            let lastPath = outputNameSplitted[0];
            outputNameSplitted.forEach((name) => {
              if (lastPath !== name) {
                lastPath = path.join(path.join(lastPath, name))
              }
              if (!fs.existsSync(path.join(outputRootPath, lastPath))) {
                fs.mkdirSync(path.join(outputRootPath, lastPath))
              }
            })
          } else {
            if (!fs.existsSync(outputPath)) {
              fs.mkdirSync(outputPath)
            }
          }
        } catch (err) {
          console.error(err)
        }
        fs.writeFile(path.join(outputPath, file), newFile, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        })
      })
    }
  })
}

export const generateModule = (keys: any) => {
  generate(filesPath, keys);
} 