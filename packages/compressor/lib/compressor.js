#!/usr/bin/env node

const program = require('commander');
const { version } = require('../package.json');
const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs-extra');
const { join } = require('path');

program
  .version(version)
  //   .command('config')
  .usage('-e <env> -o <output>')
  .description('🍈 生成配置文件')
  .option('-e, --env <env>', '当前环境')
  .option('-o, --output <output>', '输出路径')

  .action(({ output, env }) => {
    console.log('> 当前环境', env);
    console.log('> 输出路径', output);

    // 自定义规则读取本地的配置文件
    const rootPath = process.cwd(); // 当前上下文根路径，这个很重要，需要基于当前上下文去寻找文件
    const configPath = join(rootPath, `./config/${env}.config.js`);
    const outputPath = join(rootPath, output || './src/config.ts');

    if (!existsSync(configPath)) {
      throw new Error(`${env} 环境配置文件不存在`);
    }

    try {
      // 读取配置内容
      const content = readFileSync(configPath, { encoding: 'utf-8' });
      // 写入配置内容
      writeFileSync(outputPath, content, { encoding: 'utf-8' });

      console.log('> 生成配置文件成功.');
    } catch (error) {
      console.error('> 生成配置文件异常', error);
    }
  });

// 解析脚本入参
program.parse(process.argv);

