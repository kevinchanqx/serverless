import { UseCase, type UseCaseError } from '@shared/classes/use-case'

import { type RetrievePostsResponseDTO } from './retrieve-posts.dto'

export type RetrievePostsErrorCode = 'NOT_FOUND'
export type RetrievePostsError = UseCaseError<RetrievePostsErrorCode>

export abstract class IRetrievePostsUseCase extends UseCase<
Record<string, unknown>,
RetrievePostsResponseDTO,
RetrievePostsError
> {}
