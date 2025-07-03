const testAuthKey = process.env.TEST_APPLICATION_AUTHENTICATION_TOKEN

export function AuthenticateRequestWithToken(token: string): boolean {
    if (token != testAuthKey) { return false }
    
    return true;
}