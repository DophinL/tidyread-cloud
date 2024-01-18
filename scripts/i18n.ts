import * as fs from "fs";
import * as path from "path";

// 递归遍历目录
function walkDir(dir: string, callback: (filePath: string) => void) {
    fs.readdirSync(dir).forEach((f) => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

// 检查并处理文件
function checkAndProcessFile(filePath: string) {
    const ext = path.extname(filePath);
    const basename = path.basename(filePath, ext);

    // 检查是否含有i18n字段
    if (
        !basename.includes("en-US") &&
        !basename.includes("zh-CN") &&
        [".md", ".mdx", ".json"].includes(ext)
    ) {
        const newBaseNameEn = `${basename}.en-US${ext}`;
        const newBaseNameCn = `${basename}.zh-CN${ext}`;
        const dir = path.dirname(filePath);

        // 创建新文件
        fs.copyFileSync(filePath, path.join(dir, newBaseNameEn));
        fs.copyFileSync(filePath, path.join(dir, newBaseNameCn));

        // 删除原始文件
        fs.unlinkSync(filePath);

        console.log(`Processed: ${filePath}`);
    }
}

// 主函数
function main() {
    const pagesDir = path.join(__dirname, "../pages");
    walkDir(pagesDir, checkAndProcessFile);
}

main();
