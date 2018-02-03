# mdtv
<!-- [![build status](https://img.shields.io/travis/Claiyre/mdtv/master.svg?style=flat-square)](https://travis-ci.org/Claiyre/mdtv)
[![Test coverage](https://img.shields.io/codecov/c/github/Claiyre/mdtv.svg?style=flat-square)](https://codecov.io/github/Claiyre/mdtv?branch=master) -->
[![NPM version](https://img.shields.io/npm/v/mdtv.svg?style=flat-square)](https://www.npmjs.com/package/mdtv)
[![NPM Downloads](https://img.shields.io/npm/dm/mdtv.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/mdtv)

mdtv is a command-line http server to show markdown file

You also can use mdtv for: 

- preview directory/file
- download file

## Installing globally:

```
npm install mdtv -g
```

This will install mdtv globally so that it may be run from the command line.

## Usage:

```
mdtv [options]
```
Now you can visit http://localhost:8089 to view you server.

If there is index.md/index.html in the current directory, mdtv will give priority to show them or show the directory 

## Available Options

```
-V, --version          output the version number
-m, --mdName <mdName>  specify the name of md file to show
-p, --port <port>      set the port to use
-t, --toc              whether to show table of content of md files
-h, --help             output usage information
```