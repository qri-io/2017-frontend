# Qri Web App
### react & redux webapp for qri.io

[![Qri](https://img.shields.io/badge/made%20by-qri-magenta.svg?style=flat-square)](https://qri.io)
[![License](https://img.shields.io/github/license/qri-io/frontend.svg?style=flat-square)](./LICENSE)
[![Standard JS code style](https://img.shields.io/badge/code%20style-standardJS-green.svg?style=flat-square)](https://standardjs.com/)
[![CI](https://img.shields.io/circleci/project/github/qri-io/frontend.svg?style=flat-square)](https://circleci.com/gh/qri-io/frontend)

<!-- [![macOS CI Status](https://circleci.com/gh/qri-io/frontend.svg?style=shield)](https://circleci.com/gh/qri-io/frontend) -->
<!-- [![Windows CI status](https://ci.appveyor.com/api/projects/status/kqvb4oa772an58sc?svg=true)](https://ci.appveyor.com/project/qri-io/frontend) -->
<!-- [![Linux CI status](https://travis-ci.org/qri-io/frontend.svg?branch=master)](https://travis-ci.org/qri-io/frontend) -->
<!-- [![Slack Channel](http://zeit-slackin.now.sh/badge.svg)](https://zeit.chat/) -->
<!-- [![Changelog #213](https://img.shields.io/badge/changelog-%23213-lightgrey.svg)](https://changelog.com/213) -->

For more details, head to: https://qri.io

## Usage

### Installing Dependencies

Before you can build the Qri frontend, you must install and configure the following dependencies on your machine:

* [Qri](http://www.qri.io): The qri server and command line client.
  If you didn't want a pretty webapp to interact with, you would only need to install Qri itself. Head over to the [ri github page](https://www.github.com/qri-io/qri) and follow the instructions under 'Building From Source' to download and install Qri.

* [Git](http://git-scm.com/): The [Github Guide to
  Installing Git][git-setup] is a good source of information.

* [Node.js v8.6.X (LTS)](http://nodejs.org): 
    * If you don't have node installed, we recommend using [homebrew](https://brew.sh/) to manage your package of node.

    ```shell
    # Install Homebrew by running this script and following the prompts (pulled straight from the homebrew homepage)
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    # install node
    brew install node 
    ```

* [Yarn](https://yarnpkg.com): We use Yarn to install our dependencies
  (rather than using npm). See the detailed [installation instructions](https://yarnpkg.com/en/docs/install). Yarn is also installed using [homebrew](https://brew.sh/).

#### Installing the Qri webapp
Open up your terminal, naviagate into the folder that you want the frontend code to live and enter these commands:
``` shell
# Use git to clone the repository:
$ git clone https://github.com/qri-io/frontend.git

# Navigate into that directory:
$ cd frontend

# Install the dependencies:
$ yarn install

# Run the code!
$ yarn dev

# open a new window to your terminal:
$ qri connect --webapp-port=""
```

Head over to your favorite web browser and type `localhost:2505/` in to the url bar

And you should see the Qri webapp in action!

To stop the webapp from running, head over to the terminal window that is currently running the webapp and type `ctrl-c`

## Contribute

We've set up a separate document for our [contributor guildlines](https://github.com/qri-io/frontend/CONTRIBUTOR.md)!

## Develop

We've set up a separate document for [developer guildlines](https://github.com/qri-io/frontend/DEVELOPER.md)!


###### This documentation has been adapted from the [Data Together](https://github.com/datatogether/datatogether), [Hyper](https://github.com/zeit/hyper), and [AngularJS](https://github.com/angular/angularJS) documentation.