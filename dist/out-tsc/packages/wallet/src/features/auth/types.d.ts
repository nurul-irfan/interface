export declare enum AuthActionType {
    Unlock = "unlock",
    Lock = "lock"
}
export declare enum AuthSagaError {
    InvalidPassword = "Invalid password"
}
export interface AuthBaseParams {
    type: AuthActionType;
}
export interface UnlockParams extends AuthBaseParams {
    type: AuthActionType.Unlock;
    password: string;
}
export interface LockParams extends AuthBaseParams {
    type: AuthActionType.Lock;
}
//# sourceMappingURL=types.d.ts.map