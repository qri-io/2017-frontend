# Qri Web App
### react & redux webapp for qri.io

[![Qri](https://img.shields.io/badge/made%20by-qri-magenta.svg?style=flat-square)](https://qri.io)
[![License](https://img.shields.io/github/license/qri-io/cafs.svg?style=flat-square)](./LICENSE)
[![Standard JS code style](https://img.shields.io/badge/code%20style-standardJS-green.svg?style=flat-square)](https://standardjs.com/)
<!-- [![CI](https://img.shields.io/circleci/project/github/qri-io/cafs.svg?style=flat-square)](https://circleci.com/gh/qri-io/cafs) -->

<!-- [![macOS CI Status](https://circleci.com/gh/qri-io/frontend.svg?style=shield)](https://circleci.com/gh/qri-io/frontend) -->
<!-- [![Windows CI status](https://ci.appveyor.com/api/projects/status/kqvb4oa772an58sc?svg=true)](https://ci.appveyor.com/project/zeit/hyper) -->
<!-- [![Linux CI status](https://travis-ci.org/zeit/hyper.svg?branch=master)](https://travis-ci.org/zeit/hyper) -->
<!-- [![Slack Channel](http://zeit-slackin.now.sh/badge.svg)](https://zeit.chat/) -->
<!-- [![Changelog #213](https://img.shields.io/badge/changelog-%23213-lightgrey.svg)](https://changelog.com/213) -->

For more details, head to: https://qri.io

## Usage
[Download the latest release!](https://qri.io/#installation)

## Contribute

We've set up a separate document for our [contributor guildlines](https://github.com/qri-io/frontend/CONTRIBUTOR.md)!

## Develop

We've set up a separate document for [developer guildlines](https://github.com/qri-io/frontend/DEVELOPER.md)!

If you are on macOS:

1) You wil lneed to have Yarn installed. If you have never installed Yarn before, you can find out how at: https://yarnpkg.com/en/docs/install.
2. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
3. Install the dependencies: `yarn install`
4. Build the code and watch for changes: `yarn dev`

To make sure that your code works in the finished application, you can generate the binaries like this:

**NOTE FROM KASEY: I FORGET HOW TO GENERATE THE ELECTRON APP**
```bash
yarn run dist
```

After that, you will see the binary in the `./dist` folder!

------

###### This documentation has been adapted from the [Data Together](https://github.com/datatogether/datatogether), [Hyper](https://github.com/zeit/hyper), and [AngularJS](https://github.com/angular/angularJS) documentation.