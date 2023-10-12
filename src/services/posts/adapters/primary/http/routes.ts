import { LambdaHandlerForAPIGateway } from '@shared/classes/lambda-handler'

import { controller } from './controllers'

const lambda = new LambdaHandlerForAPIGateway('/posts').addRoute('GET', '/', controller.retrievePostController.handler)

export default lambda
