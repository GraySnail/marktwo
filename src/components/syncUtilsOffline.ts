import async from 'async'
import _ from 'lodash'
import { get, set, del } from 'idb-keyval'



export type CallbackFn = (err?:string|null|undefined, data?: any)=>any

function initialize() {
  function findOrFetch(name:string) {
    return new Promise(resolve => {
      get<string>(name).then(localVersion => {
        if (localVersion) {
          resolve(JSON.parse(localVersion))
        } else {
          resolve(false)
        }
      })
    })
  }

  function findOrFetchFiles(names:string[]) {
    return async.series(
      names.map(name => {
        return function (callback:CallbackFn) {
          findOrFetch(name).then(result => {
            if (result) {
              callback(null, result)
            } else {
              callback(`Could not find file ${name}`, null)
            }
          })
        }
      })
    )
  }

  function deleteFile(name:string) {
    return del(name)
  }

  function deleteFiles(names:string[]) {
    return async.series(
      names.map(name => {
        return function (callback:CallbackFn) {
          deleteFile(name)
            .then( () => {
              setTimeout(() => {
                callback()
              }, 100)
            })
            .catch(err => callback('Delete request failed'))
        }
      })
    )
  }

  function initializeData(name, defaultData) {
    return new Promise(resolve => {
      get<string>(name).then(cachedData => {
        cachedData = cachedData && JSON.parse(cachedData)
        resolve(cachedData)
      })
    })
  }

  function syncByRevision(name, newData) {
    newData.revision++
    return new Promise(resolve => {
      set(name, JSON.stringify(newData)).then(() => resolve(newData))
    })
  }

  function createFiles(files) {
    // this is handled synchronously
    return new Promise(resolve => resolve())
  }

  function getPagesForDoc(docId) {
    return new Promise(resolve => resolve([]))
  }

  function createImage() {
    return new Promise(resolve => resolve())
  }

  return {
    createFiles,
    createImage,
    deleteFile,
    deleteFiles,
    findOrFetch,
    findOrFetchFiles,
    syncByRevision,
    initializeData,
  }
}

export default initialize
