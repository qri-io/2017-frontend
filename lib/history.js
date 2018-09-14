/* globals __BUILD__ */
import { createHashHistory, createBrowserHistory } from 'history'

const history = (__BUILD__.ELECTRON) ? createHashHistory() : createBrowserHistory()
export default history
