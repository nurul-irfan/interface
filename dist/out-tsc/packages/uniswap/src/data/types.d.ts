import { QueryResult } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
export type GqlResult<T> = Pick<QueryResult<T>, 'data' | 'loading'> & Partial<Pick<QueryResult<T>, 'networkStatus'>> & {
    refetch?: () => void;
    error?: ApolloError | Error;
};
export declare enum SpamCode {
    LOW = 0,// same as isSpam = false on TokenProject
    MEDIUM = 1,// same as isSpam = true on TokenProject
    HIGH = 2
}
//# sourceMappingURL=types.d.ts.map