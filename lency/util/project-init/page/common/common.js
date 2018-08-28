/**
 * @file entry for common chunk (https://github.com/webpack/webpack/issues/1016)
 * @author memoryza(wangjincai@baidu.com)
 */
import './common.less';
import 'react';
import 'babel-polyfill';
import 'react-dom';
import 'npm-zepto';
import 'dep/flexible';
import FastClick from 'fastclick';
FastClick.attach(document.body);