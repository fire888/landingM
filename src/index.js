import { initPipeline } from './actions/initPipeline'
import { appPipeline } from "./actions/appPipeline";

const root = {}
initPipeline(root).then(appPipeline)
