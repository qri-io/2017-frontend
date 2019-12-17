<h1 align="center">WARNING: You probably want <a href="https://github.com/qri-io/desktop">Qri Desktop</a>. The code in this repository is old and no longer working.</h1>

[![Qri](https://img.shields.io/badge/made%20by-qri-magenta.svg?style=flat-square)](https://qri.io) [![License](https://img.shields.io/github/license/qri-io/frontend.svg?style=flat-square)](./LICENSE) [![Standard JS code style](https://img.shields.io/badge/code%20style-standardJS-green.svg?style=flat-square)](https://standardjs.com/) [![CI](https://img.shields.io/circleci/project/github/qri-io/frontend.svg?style=flat-square)](https://circleci.com/gh/qri-io/frontend)

<h1 align="center">Qri Webapp</h1>

<div align="center">
  <img alt="logo" src="https://qri.io/img/blobs/blob_trio.png" width="128">
</div>
<div align="center">
  <strong>react, redux & electron webapp for qri.io</strong>
</div>

<div align="center">
  <h3>
    <a href="https://qri.io">
      Website
    </a>
    <span> | </span>
    <a href="#dependencies">
      Dependencies
    </a>
    <span> | </span>
    <a href="https://github.com/qri-io/frontend/CONTRIBUTOR.md">
      Contribute
    </a>
    <span> | </span>
    <a href="https://github.com/qri-io/frontend/issues">
      Issues
    </a>
     <span> | </span>
    <a href="https://qri.io/docs/">
      Docs
    </a>
     <span> | </span>
    <a href="https://qri.io/download/">
      Download
    </a>
  </h3>
</div>

## Welcome

| Question | Answer |
|--------|-------|
| "I want to learn about Qri" | [Read the official documentation](https://qri.io/docs/) |
| "I have a question" | [Create an issue](https://github.com/qri-io/frontend/issues) and use the label 'question' |
| "I found a bug" | [Create an issue](https://github.com/qri-io/frontend/issues) and use the label 'bug' |
| "I want to help build the Qri webapp" | [Read the Contributing guides](https://github.com/qri-io/frontend/CONTRIBUTOR.md) |

<a id="dependencies"></a>
## Main Dependencies

| Dependency | Website | Github |
|------|------|------|
| Qri Backend | https://qri.io/ | https://github.com/qri-io/qri/ |
| React | https://reactjs.org/ | https://github.com/facebook/react/ |
| Redux | https://redux.js.org/ | https://github.com/reduxjs/redux |
| Electron | https://electronjs.org/ | https://github.com/electron/electron |


## LICENSE

[The MIT License](https://github.com/cyclejs/cyclejs/blob/master/LICENSE)

## Contribute

We've set up a separate document for our [contributor guidelines](https://github.com/qri-io/frontend/blob/master/CONTRIBUTOR.md)!

## Develop

We've set up a separate document for [developer guidelines](https://github.com/qri-io/frontend/blob/master/DEVELOPER.md)!

## Qri Storybook

Using [React Storybook](https://storybook.js.org/docs/guides/guide-react)!

```shell
yarn run storybook
```
We're adopting react storybook for testing & debugging components. Over time we're hoping to add stories that depict common state components for testing & refinement purposes.

If while working on Qri you find a composition of components or state that could be refined, consider writing it as a react story so we can debug it over time!


###### This documentation has been adapted from the [Data Together](https://github.com/datatogether/datatogether), [Hyper](https://github.com/zeit/hyper), [AngularJS](https://github.com/angular/angularJS), and [Cycle.js](https://github.com/cyclejs/cyclejs) documentation.
