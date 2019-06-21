## [0.7.2](https://github.com/qri-io/frontend/compare/v0.7.1...v0.7.2) (2019-06-19)

This release contains two major updates. First, we have fixed pagination throughout the app! Not only do our dataset lists paginate correctly, but we have added preliminary pagination to the dataset body. Second, we have added [storybook](https://storybook.js.org/) to our app for help with development and design. So far there is a short list of components that you can view on storybook, but we plan on continuing to add components as we work on them. We used storybook to iterate on the new `DownloadBar` component, which features in the readonly version of the webapp, and it allowed for quicker iteration. We are pumped to continue to use it in the future.

### Bug Fixes

* **Button:** fix logic in download button! ([27594d4](https://github.com/qri-io/frontend/commit/27594d4))
* **pagination:** fixes pagination on datasets, registry datasets, profiles, search results, and history ([2633d76](https://github.com/qri-io/frontend/commit/2633d76))
* **scss:** Use valid monospace font name ([#494](https://github.com/qri-io/frontend/issues/494)) ([f5b2d6c](https://github.com/qri-io/frontend/commit/f5b2d6c))
* **StructureForm:** make json-schema link an ExternalLink ([#496](https://github.com/qri-io/frontend/issues/496)) ([7ba8a42](https://github.com/qri-io/frontend/commit/7ba8a42)), closes [#495](https://github.com/qri-io/frontend/issues/495)
* **storybook:** add custom webpack file to storybook config to load scss ([5edae8d](https://github.com/qri-io/frontend/commit/5edae8d))


### Features

* add pagination to the body ([33c0412](https://github.com/qri-io/frontend/commit/33c0412))
* **DatasetButtonGroup:** add dummy update button ([8fc1d73](https://github.com/qri-io/frontend/commit/8fc1d73))
* **DownloadBar:** add `DownloadBar` component ([20c8fec](https://github.com/qri-io/frontend/commit/20c8fec))
* **storybook:** add isolated Button.js ([6d0673d](https://github.com/qri-io/frontend/commit/6d0673d))
* **storybook:** add plugin to deal with `APP_TARGET` ([decd87c](https://github.com/qri-io/frontend/commit/decd87c))



## [0.7.1](https://github.com/qri-io/frontend/compare/v0.7.0...v0.7.1) (2019-04-16)

As a growing open source project, we are always looking for ways to connect to our community. One way that we have yet to take advantage of (on the webapp side of our project), is using the release notes to be more explicit about our choices and goals. We want you to get two major things out of our release notes: 
1) for you to understand, without having to view the code, what has changed, and 
2) for you to understand our reasons for making those changes.

As you can perhaps tell, many discussions have centered around how we can be more welcoming as a project. 

### Moving towards modern React

We want our codebase to be more accessible to folks who are viewing it for the first time. The first major change we have made is to refactor our components so they look more like vanilla React. We had also allowed a bit of tech debt to pile up that was preventing us from moving forward; there are many interesting features coming out of the React project that we would like to experiment with, but couldn't because our codebase was out of date.

The parts of React we focused on were:
- upgrading React, Webpack, Babel, and Electron, making any changes to code that we need to allow those upgrades to function
- refactoring the codebase to look more like plain ol' React by removing inheritance from a `Base` class that was giving us a couple of neat tricks that we have outgrown. This refactor moves all of our css styling from each component page to our scss folder.
- fixing a few bugs that are listed in the changelog, the most visible is a height bug that made any component using Monaco Editor unusable.

Except for fixing a few bugs, this version of the webapp has almost no changes to functionality. So, even though it changes thousands of lines of code, we are calling this release a patch.


### Bug Fixes

* **build:** restore electron compilation ([1fd0d96](https://github.com/qri-io/frontend/commit/1fd0d96))
* **Button:** fix incorrect `Button` component import in `ReadOnly` component ([27eae33](https://github.com/qri-io/frontend/commit/27eae33))
* **EditBody:** fix bug that wasn't passing height to editor body ([a811d87](https://github.com/qri-io/frontend/commit/a811d87))
* **Overview:** adjust style for better `Overview` layout ([0f9c4e3](https://github.com/qri-io/frontend/commit/0f9c4e3))
* various cleanup & fixes ([dc84e56](https://github.com/qri-io/frontend/commit/dc84e56))
* **dataset:** add logic to dataset page to show correct error messaging ([c40b1d4](https://github.com/qri-io/frontend/commit/c40b1d4))
* **dataset:** add silent error to dataset and registry load dataset actions ([89e146f](https://github.com/qri-io/frontend/commit/89e146f))
* **Dataset:** Improvements to viewing a dataset ([611c6d1](https://github.com/qri-io/frontend/commit/611c6d1))
* **editor:** Dataset name improvements after clicking 'Edit' ([b7ecacf](https://github.com/qri-io/frontend/commit/b7ecacf))
* **Transform:** change case on import ([2b44223](https://github.com/qri-io/frontend/commit/2b44223))
* **ValidInput:** adding `me/` prefix to `ValidInput` now optional ([84c7ac1](https://github.com/qri-io/frontend/commit/84c7ac1))
* **webapp:** fix webapp prod compilation ([95b6f58](https://github.com/qri-io/frontend/commit/95b6f58))


### Features

* **webpack:** add readonly dev and prod configs ([3b6671a](https://github.com/qri-io/frontend/commit/3b6671a))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/qri-io/frontend/compare/v0.1.0...v0.2.0) (2018-07-19)


### Bug Fixes

* **dataset:** need to ensure that a dataset has a structure.schema brefore attempting to load the data ([d9ceaf6](https://github.com/qri-io/frontend/commit/d9ceaf6))
* **error display:** reposition error display, remove old log calls ([f4e8f35](https://github.com/qri-io/frontend/commit/f4e8f35))
* **extractSchema:** adjust extractSchema to work with non-tabular data ([ecaa3f4](https://github.com/qri-io/frontend/commit/ecaa3f4))
* **HandsonTable:** adjust styling ([38a884b](https://github.com/qri-io/frontend/commit/38a884b))
* **Json:** change `data` to `body` ([caaef05](https://github.com/qri-io/frontend/commit/caaef05))
* **searchBar, TopBar:** only pull searchBar text from app.search ([054f877](https://github.com/qri-io/frontend/commit/054f877))


### Features

* **AddDataset:** adding choice between url add dropfile in addDataset ([143acc7](https://github.com/qri-io/frontend/commit/143acc7))
* **electron, styling:** updates for electron toolbar, re-styled type ([8bb4fdd](https://github.com/qri-io/frontend/commit/8bb4fdd))
* **HandsonTable:** first pass at adding back table viewer :) ([6d9c33b](https://github.com/qri-io/frontend/commit/6d9c33b))
* **nav:** added nav buttons to topbar ([4c32296](https://github.com/qri-io/frontend/commit/4c32296))
* **RadioInput:** add component for radio input, add styling to match sketch file ([dca6b06](https://github.com/qri-io/frontend/commit/dca6b06))
* **search:** add searchItem, searchResults, and selectors/search ([b5095aa](https://github.com/qri-io/frontend/commit/b5095aa))
* **searchBar:** can now handle search in the search bar ([64bdb24](https://github.com/qri-io/frontend/commit/64bdb24))
* **searchBar:** creating initial search page and adding selectors for state.app.search ([4fe85cc](https://github.com/qri-io/frontend/commit/4fe85cc))
* **selector/layout:** adding layout selector to containers and components ([4f46f91](https://github.com/qri-io/frontend/commit/4f46f91))
* **selectors/layout:** adding selectors for layout ([83e990d](https://github.com/qri-io/frontend/commit/83e990d))
* **topbar:** introduce TopBar component for navigation ([17deeae](https://github.com/qri-io/frontend/commit/17deeae))
* **viz:** add viz tab to dataset components list ([66cffba](https://github.com/qri-io/frontend/commit/66cffba))



<a name="0.0.2"></a>
## [0.0.2](https://github.com/qri-io/frontend/compare/v0.0.1...v0.0.2) (2018-05-15)


### Bug Fixes

* **dataset:** fixes the views on previous datasets and peer's datasets ([2cec1f](https://github.com/qri-io/frontend/commit/2cec1f))



<a name="0.0.1"></a>
## 0.0.1 (2018-05-15)


### Bug Fixes

* bug fix and clean up Peer, PeerHeader, Settings, peers ([c046e92](https://github.com/qri-io/frontend/commit/c046e92))
* history is now always hashHistory ([278bc99](https://github.com/qri-io/frontend/commit/278bc99))
* **/me:** hitting the /#/me endpoint on the app returns profile info ([7515f94](https://github.com/qri-io/frontend/commit/7515f94))
* **/me:** hitting the /#/me/datasetname endpoint on the app returns appropriate dataset info ([ebbf39f](https://github.com/qri-io/frontend/commit/ebbf39f))
* **addDataset:** update api endpoint for add datasets functionality ([ab71ee2](https://github.com/qri-io/frontend/commit/ab71ee2))
* **AddDataset:** fix AddDataset save button enable ([73452a6](https://github.com/qri-io/frontend/commit/73452a6))
* **AddDataset, Dropfile:** fix bug that wasn't updating state ([3f584b7](https://github.com/qri-io/frontend/commit/3f584b7))
* **AddDataset, Spinner:** when dataset is being added, load Spinner ([3a7412f](https://github.com/qri-io/frontend/commit/3a7412f))
* **app:** drag and drop bug ([a727b34](https://github.com/qri-io/frontend/commit/a727b34))
* **AppDrag:** added back `Header` component, renamed to `AppDrag` ([9bdaa68](https://github.com/qri-io/frontend/commit/9bdaa68))
* **AppLoading:** make app draggable while loading ([f399c20](https://github.com/qri-io/frontend/commit/f399c20))
* **build:** fix build breakages introduced by new data grid ([111c646](https://github.com/qri-io/frontend/commit/111c646))
* **build:** increase node memory on renderer build ([#243](https://github.com/qri-io/frontend/issues/243)) ([a03e564](https://github.com/qri-io/frontend/commit/a03e564))
* **CommitItem:** Commits now show the profile photo of the person who made the commit ([c5437bb](https://github.com/qri-io/frontend/commit/c5437bb))
* **data:** need dataPath to correctly select the dataset's data ([44b93a7](https://github.com/qri-io/frontend/commit/44b93a7))
* **dataset:** fix bug that hung dataset page loading ([9e0c1d2](https://github.com/qri-io/frontend/commit/9e0c1d2))
* **dataset:** handle case in dataset where structure is not an object ([ef0760f](https://github.com/qri-io/frontend/commit/ef0760f))
* **dataset:** remove ability for peer to edit dataset that they did not add to the network ([98216d0](https://github.com/qri-io/frontend/commit/98216d0))
* **dataset:** when data returns with an error, do not try to load the data again ([2695947](https://github.com/qri-io/frontend/commit/2695947))
* **Dataset:** fix bug that hung app when refreshing a dataset page ([50087df](https://github.com/qri-io/frontend/commit/50087df))
* **Dataset:** load most recent version of dataset ([49292ac](https://github.com/qri-io/frontend/commit/49292ac))
* **dataset actions:** .then() calls must return action ([bb8e75e](https://github.com/qri-io/frontend/commit/bb8e75e))
* **dataset, metadataEditor:** bug fixes ([4bfc968](https://github.com/qri-io/frontend/commit/4bfc968))
* **DatasetDataGrid:** fix bug that had col details pop up in not correct spot ([057ae23](https://github.com/qri-io/frontend/commit/057ae23))
* **datasetItem:** add label to stat field ([a19d791](https://github.com/qri-io/frontend/commit/a19d791))
* **DatasetItem:** bytes now show properly and with correct labels ([f48217a](https://github.com/qri-io/frontend/commit/f48217a))
* **Datasets:** component should wait for sessionID before trying to load datasets ([3454624](https://github.com/qri-io/frontend/commit/3454624))
* **Datasets, Peers:** fix bug that led to perpetual loading spinner ([38d0bf7](https://github.com/qri-io/frontend/commit/38d0bf7))
* **defaultColumnWidth:** no data bug fix ([f79955c](https://github.com/qri-io/frontend/commit/f79955c))
* **defaultColumnWidths:** min width is now header width ([4aa6776](https://github.com/qri-io/frontend/commit/4aa6776))
* **delete dataset:** fix bug in delete dataset ([9992e81](https://github.com/qri-io/frontend/commit/9992e81))
* **deleteDataset, renameDataset:** update api endpoints ([dc95212](https://github.com/qri-io/frontend/commit/dc95212))
* **deleteDataset, renameDataset:** update api endpoints ([83fa601](https://github.com/qri-io/frontend/commit/83fa601))
* **DMG packaging:** made mac OS DMG packageing work ([25d65ed](https://github.com/qri-io/frontend/commit/25d65ed))
* **Electron Startup:** stop moving qri binary to /usr/local/bin, make work better ([a16aba0](https://github.com/qri-io/frontend/commit/a16aba0))
* **export:** update export endpoint to reflect new qri API endpoint ([04e1aab](https://github.com/qri-io/frontend/commit/04e1aab))
* **fetchDatasetData:** fix bug that pointed to wrong endpoint ([cd10163](https://github.com/qri-io/frontend/commit/cd10163))
* **Header:** to enable app drag, need height and width ([262a3a8](https://github.com/qri-io/frontend/commit/262a3a8))
* **Json Arr:** fix the way arrays are displayed in Json component ([7d52f7f](https://github.com/qri-io/frontend/commit/7d52f7f))
* **json, dataset:** minor css changes to dataset tabpanel and json ([f195a00](https://github.com/qri-io/frontend/commit/f195a00))
* **keyboard commands, menu:** link main process to menu ([955db85](https://github.com/qri-io/frontend/commit/955db85))
* **layoutReducer:** fix bug in layout reducer with session and fix tests ([eacf491](https://github.com/qri-io/frontend/commit/eacf491))
* **lint:** fix linting error ([61f7878](https://github.com/qri-io/frontend/commit/61f7878))
* **LoadMore:** when button is clicked loading Spinner displays correctly ([aae7bcc](https://github.com/qri-io/frontend/commit/aae7bcc))
* **Meta:** only show `Edit` button if this is the peer's dataset ([6138d70](https://github.com/qri-io/frontend/commit/6138d70))
* **metadata editor:** bug fixes to saving metadata ([2e2211f](https://github.com/qri-io/frontend/commit/2e2211f))
* **MetadataEditor:** saveDataset redirects to dataset page with updated metadata ([bf674ca](https://github.com/qri-io/frontend/commit/bf674ca))
* **modal:** edit styling so `thin` and `large` params actually effect modal size ([3650069](https://github.com/qri-io/frontend/commit/3650069))
* **modal:** fix bug that had modal-wrap background behind certain elements ([a85e942](https://github.com/qri-io/frontend/commit/a85e942))
* **pageHeader:** fix bug that had text at two different levels ([f4def8b](https://github.com/qri-io/frontend/commit/f4def8b))
* **PageHeader:** remove style that threw off PageHeader text layout ([d8c63e1](https://github.com/qri-io/frontend/commit/d8c63e1))
* **paginate/loadmore:** fixing the way fetchedAll is calculated ([63f4183](https://github.com/qri-io/frontend/commit/63f4183))
* **pagination:** fixed bug in selector that altered the state tree ([7e695e4](https://github.com/qri-io/frontend/commit/7e695e4))
* **peer:** fix bug that let you change the photos on a peer's page ([9cec857](https://github.com/qri-io/frontend/commit/9cec857))
* **peer:** if no peer is found, user should be informed and loading spinner should end ([0f91a27](https://github.com/qri-io/frontend/commit/0f91a27))
* **Peer:** address linting error ([8d1fdd8](https://github.com/qri-io/frontend/commit/8d1fdd8))
* **Peer:** attempt to connect on peer page ([d0232c0](https://github.com/qri-io/frontend/commit/d0232c0))
* **peer dataset:** fix bug that didn't load peer's dataset correctly ([c54b855](https://github.com/qri-io/frontend/commit/c54b855))
* **Peer, Profile:** bug fixes ([7ab47f4](https://github.com/qri-io/frontend/commit/7ab47f4))
* **port:** update to new port assignment ([d599a71](https://github.com/qri-io/frontend/commit/d599a71))
* **ProfileEditor:** add notes about what fields are necessary ([5f7e803](https://github.com/qri-io/frontend/commit/5f7e803))
* **Queries, Pagination:** order Query ids in query selector ([9ac0779](https://github.com/qri-io/frontend/commit/9ac0779))
* **query, session:** fix bug that was adding undefined to session history on runQuery ([1c0e799](https://github.com/qri-io/frontend/commit/1c0e799))
* **queryEditor:** more specific query editor errors ([75b9d00](https://github.com/qri-io/frontend/commit/75b9d00))
* **routes:** dataset is now the home page ([1a26ecd](https://github.com/qri-io/frontend/commit/1a26ecd))
* re-add missing stylesheet in build ([36520e8](https://github.com/qri-io/frontend/commit/36520e8))
* **scrollbar:** color scrollbar corner ([c8f134f](https://github.com/qri-io/frontend/commit/c8f134f))
* **search:** fix style and loading bugs ([aa9f87c](https://github.com/qri-io/frontend/commit/aa9f87c))
* **session dataset:** add selectors that return a list of the session peer's datasets ([61c8858](https://github.com/qri-io/frontend/commit/61c8858))
* **settings:** fix formatting in settings ([3dd0bbb](https://github.com/qri-io/frontend/commit/3dd0bbb))
* **TabPanel:** make TabPanel background more flexible ([6a45b51](https://github.com/qri-io/frontend/commit/6a45b51))
* **tests:** tests conform to codebase changes ([565dc65](https://github.com/qri-io/frontend/commit/565dc65))


### Features

* add dataset from url and save query ([2e524ee](https://github.com/qri-io/frontend/commit/2e524ee))
* allow Queries to pass QueryItem multiple functions without breaking List ([7163f4c](https://github.com/qri-io/frontend/commit/7163f4c))
* can now add a peer dataset from the peer page ([398e559](https://github.com/qri-io/frontend/commit/398e559))
* **add peer dataset:** can rename peer dataset on ingest ([f1b0a59](https://github.com/qri-io/frontend/commit/f1b0a59))
* **AddDataset:** add option for retreaving dataset via URL ([61c6e9b](https://github.com/qri-io/frontend/commit/61c6e9b))
* **AddDataset:** when dataset is successfully added, redirects you to previous page ([4f309e3](https://github.com/qri-io/frontend/commit/4f309e3))
* **AddDataset, DropFile:** add dataset via url or file upload ([a8fc273](https://github.com/qri-io/frontend/commit/a8fc273))
* **AddDataset, DropFile:** set onDragOver, onDragLeave, and start of onDragDrop ([2b40a95](https://github.com/qri-io/frontend/commit/2b40a95))
* **app.test:** add tests for app reducer ([b4ff71e](https://github.com/qri-io/frontend/commit/b4ff71e))
* **AppUnavail:** when backend is unavailable, let users know ([09808d6](https://github.com/qri-io/frontend/commit/09808d6))
* **backend:** new qri build ([16106d0](https://github.com/qri-io/frontend/commit/16106d0))
* **backend:** new Qri Build ([d31afeb](https://github.com/qri-io/frontend/commit/d31afeb))
* **backend:** Use PATH qri command & repo ([2ad7587](https://github.com/qri-io/frontend/commit/2ad7587)), closes [#209](https://github.com/qri-io/frontend/issues/209)
* **barChart:** bar chart colors pull from the palette ([c5bce20](https://github.com/qri-io/frontend/commit/c5bce20))
* **ChartOptionsPicker:** bring select inputs closer to current app design ([ac982e2](https://github.com/qri-io/frontend/commit/ac982e2))
* **config:** adjust webpack dev server config so browser history works on dev server ([ba9f237](https://github.com/qri-io/frontend/commit/ba9f237))
* **Console:** redesigned console page ([7344082](https://github.com/qri-io/frontend/commit/7344082))
* **console.test:** add tests to console reducer ([76e83e9](https://github.com/qri-io/frontend/commit/76e83e9))
* **Data:** add component Data that mirrors Meta and Structure components ([3466fe7](https://github.com/qri-io/frontend/commit/3466fe7))
* **dataset:** add back dataset reload button ([b666ae8](https://github.com/qri-io/frontend/commit/b666ae8))
* **dataset:** add expand to tabPanel ([007efd1](https://github.com/qri-io/frontend/commit/007efd1))
* **dataset:** description in dataset header ([eed9bb3](https://github.com/qri-io/frontend/commit/eed9bb3))
* **dataset:** read more/read less dataset description ([f8367c9](https://github.com/qri-io/frontend/commit/f8367c9))
* **dataset:** styling to make dataset page more closely to the sketch file ([6912168](https://github.com/qri-io/frontend/commit/6912168))
* **Dataset:** move data from 3rd tab to 1st tab ([05c4da1](https://github.com/qri-io/frontend/commit/05c4da1))
* **dataset data grid:** groundwork for reload data ([452aecc](https://github.com/qri-io/frontend/commit/452aecc))
* **dataset, commit:** can view a dataset at a specific commit ([0d08791](https://github.com/qri-io/frontend/commit/0d08791))
* **DatasetHeader:** description now in DatasetHeader ([97f5ad7](https://github.com/qri-io/frontend/commit/97f5ad7))
* **datasetQueries:** added datasetQuery actions & pagination ([c26c913](https://github.com/qri-io/frontend/commit/c26c913))
* **dropdown:** add Dropdown and sample DropdownMenu components ([c02e5fd](https://github.com/qri-io/frontend/commit/c02e5fd))
* **DropFile:** additional styling to onDrop and onDragEnd ([f968831](https://github.com/qri-io/frontend/commit/f968831))
* **FieldItem:** Added FieldItem component ([9d3ce75](https://github.com/qri-io/frontend/commit/9d3ce75))
* **history:** set configuration, use hashHistory for Electron App, browserHistory elsewhere ([59682fb](https://github.com/qri-io/frontend/commit/59682fb))
* **History:** dataset history can be viewed from the dataset page ([279f4d0](https://github.com/qri-io/frontend/commit/279f4d0))
* **inputs:** making inputs less hideous ([ff09d49](https://github.com/qri-io/frontend/commit/ff09d49))
* **Json:** added basic JSON view component ([c9ca56f](https://github.com/qri-io/frontend/commit/c9ca56f))
* **layout.test:** add tests to layout reducer ([6325c8d](https://github.com/qri-io/frontend/commit/6325c8d))
* **locals.test:** add tests to locals reducer ([32f72b6](https://github.com/qri-io/frontend/commit/32f72b6))
* **Meta:** add Meta component to display the metadata ([1b4537a](https://github.com/qri-io/frontend/commit/1b4537a))
* **metaProps:** add metaProps to validate metadata params ([2f66851](https://github.com/qri-io/frontend/commit/2f66851))
* **Online:** add Online component and add to ProfileItem and ProfileHeader ([c493554](https://github.com/qri-io/frontend/commit/c493554))
* **package:** add yarn command for packaging app in debug mode ([b0c8ea0](https://github.com/qri-io/frontend/commit/b0c8ea0))
* **Peer:** initial redesign of peer page ([d7ace84](https://github.com/qri-io/frontend/commit/d7ace84))
* **peers:** add back support for peers list & single display ([d2750ef](https://github.com/qri-io/frontend/commit/d2750ef))
* **peers:** add connections ([f8c7a4f](https://github.com/qri-io/frontend/commit/f8c7a4f))
* **peers:** add more info into peer page ([7d3b27a](https://github.com/qri-io/frontend/commit/7d3b27a))
* **PeerSidebar:** add more structure to PeerSidebar ([1fa4eb1](https://github.com/qri-io/frontend/commit/1fa4eb1))
* **profile:** add profile route and icon in side bar ([3729917](https://github.com/qri-io/frontend/commit/3729917))
* **Profile:** set profile & poster photo on peers ([8d3f377](https://github.com/qri-io/frontend/commit/8d3f377))
* **Profile:** user profile support ([ca5899d](https://github.com/qri-io/frontend/commit/ca5899d))
* **ProfileEditor:** add ProfileEditor container and component ([41a0202](https://github.com/qri-io/frontend/commit/41a0202))
* **ProfileEditor:** wire up ProfileEditor and add ProfileSidebar ([b3f8475](https://github.com/qri-io/frontend/commit/b3f8475))
* **Query Editor:** errors display below query editor ([ee8f13f](https://github.com/qri-io/frontend/commit/ee8f13f))
* **QueryItem:** add save query button to queryItem ([25a62fe](https://github.com/qri-io/frontend/commit/25a62fe))
* **QueryItem:** change format of save button ([0eb34e6](https://github.com/qri-io/frontend/commit/0eb34e6))
* **readonly:** added page header to use in read-only mode ([5acbeda](https://github.com/qri-io/frontend/commit/5acbeda))
* **readonly:** weave ReadOnly components and sessionPeer into all containers/components ([85d79cd](https://github.com/qri-io/frontend/commit/85d79cd))
* **ReadOnly:** add ReadOnly and DataReadOnly components ([64451e6](https://github.com/qri-io/frontend/commit/64451e6))
* **redesign:** adding basic components, updating stylesheet, and palette ([c63d8d5](https://github.com/qri-io/frontend/commit/c63d8d5))
* **rename dataset:** can now rename a dataset from the dataset page ([9f0642b](https://github.com/qri-io/frontend/commit/9f0642b))
* **Save Query:** save query as dataset ([30e1c65](https://github.com/qri-io/frontend/commit/30e1c65))
* **SaveMetadataForm:** adding commit message via SaveMetadataForm modal ([f7ec2cf](https://github.com/qri-io/frontend/commit/f7ec2cf))
* **SaveQueryForm:** create saveQueryForm ([33abb9c](https://github.com/qri-io/frontend/commit/33abb9c))
* **search:** add search component ([22be329](https://github.com/qri-io/frontend/commit/22be329))
* **session:** add functions to actions & selectors for editing profile ([93ab16f](https://github.com/qri-io/frontend/commit/93ab16f))
* **session datasets:** add function to load datasets from `/info/me` endpoint ([105e579](https://github.com/qri-io/frontend/commit/105e579))
* **session.test:** add tests to session reducer ([71d4387](https://github.com/qri-io/frontend/commit/71d4387))
* New Data Grid display ([8f1a315](https://github.com/qri-io/frontend/commit/8f1a315))
* **Settings:** current node's hash now displayed on settings page ([7fa232d](https://github.com/qri-io/frontend/commit/7fa232d))
* **settings.test:** modify settings reducer tests to use redux-testkit ([0326c81](https://github.com/qri-io/frontend/commit/0326c81))
* **StatItemList:** add StatItemList component to peer ([c2fc534](https://github.com/qri-io/frontend/commit/c2fc534))
* **StatsItem:** add StatsItem component to peers and datasets ([5ff97dc](https://github.com/qri-io/frontend/commit/5ff97dc))
* **StatsLine, Hash, Datestamp:** added "style" property ([aa8f676](https://github.com/qri-io/frontend/commit/aa8f676))
* **webapp:** webapp dev environment ([3e31d4d](https://github.com/qri-io/frontend/commit/3e31d4d))
* **webapp:** webapp dev environment ([5c98773](https://github.com/qri-io/frontend/commit/5c98773))


### Performance Improvements

* **backend:** new qri binary ([8e90c09](https://github.com/qri-io/frontend/commit/8e90c09))
* **backend:** new qri binary ([48617e2](https://github.com/qri-io/frontend/commit/48617e2))
* **backend:** new Qri binary ([8f27374](https://github.com/qri-io/frontend/commit/8f27374))
* **backend:** new Qri binary ([346bf17](https://github.com/qri-io/frontend/commit/346bf17))
* **backend:** new Qri Binary ([8f77052](https://github.com/qri-io/frontend/commit/8f77052))
* **backend:** new Qri build ([462f509](https://github.com/qri-io/frontend/commit/462f509))
* **backend:** new Qri build ([8437baa](https://github.com/qri-io/frontend/commit/8437baa))
* **backend:** new Qri build ([755bec0](https://github.com/qri-io/frontend/commit/755bec0))
* **backend:** new Qri build ([bd6f64a](https://github.com/qri-io/frontend/commit/bd6f64a))
* **backend:** new Qri build ([c6d5f63](https://github.com/qri-io/frontend/commit/c6d5f63))
* **backend:** new Qri build ([4829656](https://github.com/qri-io/frontend/commit/4829656))
* **backend:** new Qri build ([db79258](https://github.com/qri-io/frontend/commit/db79258))
* **backend:** new Qri build ([cc71788](https://github.com/qri-io/frontend/commit/cc71788))
* **backend:** new Qri build ([85d0624](https://github.com/qri-io/frontend/commit/85d0624))
* **Json:** auto-collapse oversized Json closures ([bc48661](https://github.com/qri-io/frontend/commit/bc48661))



