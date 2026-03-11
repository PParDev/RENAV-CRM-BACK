export declare class AuthService {
    login(body: any): {
        access_token: string;
        message?: undefined;
    } | {
        message: string;
        access_token?: undefined;
    };
}
