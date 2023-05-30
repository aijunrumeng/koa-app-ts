const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const version = args.length > 0 ? args[0] : null;

const filePath = path.join(process.cwd(), 'package.json');

let retryCount = 0;

// 读取package.json文件
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('读取文件失败:', err);
    return;
  }
  // 将文件内容解析成JSON对象
  const packageJson = JSON.parse(data);
  // 获取当前版本号
  const currentVersion = packageJson.version;
  const newVersion = version ? version : getNextVersion(currentVersion);
  // 更新JSON对象中的版本号
  packageJson.version = newVersion;
  // 将JSON对象转换成字符串，并写入文件
  fs.writeFile(
    filePath,
    JSON.stringify(packageJson, null, 2),
    'utf-8',
    (err) => {
      if (err) {
        console.error('写入文件失败:', err);
        return;
      }
      console.log(`版本号已修改为${newVersion}`);
      // 提交代码并添加版本号为提交信息
      try {
        execSync(`git add ${filePath}`);
        execSync(`git commit -m "${newVersion}"`);
        console.log('代码已提交');
        execSync(`git tag -a v${newVersion} -m ver.${newVersion}`);
        console.log('标签已完成');
        pushToRemote();
      } catch (error) {
        console.error('提交代码失败:', error);
      }
    }
  );
});

function getNextVersion(currentVersion) {
  // 将版本号加1
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  return `${major}.${minor}.${patch + 1}`;
}

const pushToRemote = () => {
  try {
    execSync(`git push --follow-tags origin master`);
    console.log('分支和标签已推送');
  } catch (error) {
    console.log(error, 'error.Error');
    setTimeout(() => {
      retryCount++;
      if (retryCount <= 30) {
        pushToRemote();
      } else {
        console.error(error);
      }
    }, 5000);
  }
};
