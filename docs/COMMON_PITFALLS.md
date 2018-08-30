## Oh shit! something's wronG?!?!?!??!

Is something going wrong and is super annoying and you can't figure out what's causing the error?

This frustration usually shows up when I pass or change props, but don't see the resulting change getting rendered.

Here are some common mistakes I've made that might be able to save you some banging-your-head-against-the-wall time.

#### Did you modify the state tree or underlying data by accident? 

Here's an example of when I modified the state tree by accident and what we did to fix it:

In the datasets selectors (/lib/selectors/dataset.js), I needed to add to each dataset whether or not that dataset was currently being transfered (downloaded). I was pumped, initially, because I was able to see the correct change in the app when a datatset ID was added to the transfering list. But when an ID was removed from the list, that same change never changed back. It turned out I was modifying the underlying data to always contain the transfering property:

```javascript
// In the selectDatasets function
export function selectDatasets (state, section, node) {
  return selectDatasetsIds(state, section, node, comparedatasets).map(id => {
    const dataset = datasets[id]
    // if the dataset is transfering, mark that in the dataset
    if (selectIsTransfering(state, id)) {
      dataset['transfering'] = true
    }
    return dataset
  })
}
```

By setting `dataset` to equal `datasets[id]` directly, I was modifying the underlying state tree. That is a big no no. In react/redux, we have a lot of structure about when and how you can modify the state tree. Randomly doing it in a DatasetContainer's connect function is not one of the places you should do it.

So how do we get around this? We need to allocate a new version of the dataset object we are trying to modify, and make the change there. In this case, we used Object.assign to create a new object that contains all the same fields as `datasets[id]`:

```javascript
export function selectDatasets (state, section, node) {
  return selectDatasetsIds(state, section, node, comparedatasets).map(id => {
    const dataset = Object.assign({}, datasets[id])
    // if the dataset is transfering, mark that in the dataset
    if (selectIsTransfering(state, id)) {
      dataset['transfering'] = true
    }
    return dataset
  })
}
```
